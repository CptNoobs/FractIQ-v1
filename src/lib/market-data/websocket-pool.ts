import { BehaviorSubject } from "rxjs";

class WebSocketPool {
  private static instance: WebSocketPool;
  private connections: Map<string, WebSocket> = new Map();
  private maxConnections = 4; // Binance limit is 5 per IP
  private symbolsPerConnection: Map<WebSocket, Set<string>> = new Map();
  private messageHandlers: Map<string, Set<(data: any) => void>> = new Map();

  private constructor() {}

  static getInstance(): WebSocketPool {
    if (!WebSocketPool.instance) {
      WebSocketPool.instance = new WebSocketPool();
    }
    return WebSocketPool.instance;
  }

  subscribeSymbol(symbol: string, handler: (data: any) => void) {
    // Add handler
    if (!this.messageHandlers.has(symbol)) {
      this.messageHandlers.set(symbol, new Set());
    }
    this.messageHandlers.get(symbol)?.add(handler);

    // Find or create connection
    let targetWs = this.findOptimalConnection(symbol);
    if (!targetWs) {
      targetWs = this.createConnection();
    }

    // Add symbol to connection
    const symbols = this.symbolsPerConnection.get(targetWs) || new Set();
    symbols.add(symbol);
    this.symbolsPerConnection.set(targetWs, symbols);

    // Subscribe to symbol
    this.sendSubscription(targetWs, Array.from(symbols));
  }

  private findOptimalConnection(symbol: string): WebSocket | null {
    let bestWs: WebSocket | null = null;
    let minSymbols = Infinity;

    for (const [ws, symbols] of this.symbolsPerConnection.entries()) {
      if (symbols.size < minSymbols && symbols.size < 200) {
        // Binance limit 200 per connection
        bestWs = ws;
        minSymbols = symbols.size;
      }
    }

    return bestWs;
  }

  private createConnection(): WebSocket {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.s) {
          // Symbol exists
          const handlers = this.messageHandlers.get(data.s);
          handlers?.forEach((handler) => handler(data));
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.handleConnectionError(ws);
    };

    this.connections.set(ws.url, ws);
    this.symbolsPerConnection.set(ws, new Set());
    return ws;
  }

  private sendSubscription(ws: WebSocket, symbols: string[]) {
    if (ws.readyState === WebSocket.OPEN) {
      const subscribeMsg = {
        method: "SUBSCRIBE",
        params: symbols.map((s) => `${s.toLowerCase()}@ticker`),
        id: Date.now(),
      };
      ws.send(JSON.stringify(subscribeMsg));
    }
  }

  private handleConnectionError(ws: WebSocket) {
    const symbols = this.symbolsPerConnection.get(ws);
    if (symbols) {
      // Redistribute symbols to other connections
      symbols.forEach((symbol) => {
        const handlers = this.messageHandlers.get(symbol);
        if (handlers) {
          handlers.forEach((handler) => {
            this.subscribeSymbol(symbol, handler);
          });
        }
      });
    }

    // Cleanup
    this.connections.delete(ws.url);
    this.symbolsPerConnection.delete(ws);
    ws.close();
  }

  unsubscribeSymbol(symbol: string, handler: (data: any) => void) {
    this.messageHandlers.get(symbol)?.delete(handler);

    // If no more handlers, remove from connection
    if (!this.messageHandlers.get(symbol)?.size) {
      for (const [ws, symbols] of this.symbolsPerConnection.entries()) {
        if (symbols.has(symbol)) {
          symbols.delete(symbol);
          this.sendSubscription(ws, Array.from(symbols));
          break;
        }
      }
    }
  }

  cleanup() {
    this.connections.forEach((ws) => ws.close());
    this.connections.clear();
    this.symbolsPerConnection.clear();
    this.messageHandlers.clear();
  }
}

export const wsPool = WebSocketPool.getInstance();
