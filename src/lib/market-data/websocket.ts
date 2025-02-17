import { marketDataCache } from "./cache";

type WebSocketCallback = (data: any) => void;

class MarketWebSocket {
  private static instance: MarketWebSocket;
  private ws: WebSocket | null = null;
  private callbacks: Map<string, Set<WebSocketCallback>> = new Map();
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  private constructor() {}

  static getInstance(): MarketWebSocket {
    if (!MarketWebSocket.instance) {
      MarketWebSocket.instance = new MarketWebSocket();
    }
    return MarketWebSocket.instance;
  }

  connect(symbol: string, callback: WebSocketCallback): void {
    if (!this.callbacks.has(symbol)) {
      this.callbacks.set(symbol, new Set());
    }
    this.callbacks.get(symbol)?.add(callback);

    // Check cache first
    const cachedData = marketDataCache.getMarketData(symbol);
    if (cachedData) {
      callback(cachedData);
    }

    // Connect to Binance WebSocket
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`;

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log(`WebSocket connected: ${wsUrl}`);
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // Update cache
          marketDataCache.setMarketData(symbol, this.transformData(data));
          // Notify subscribers
          this.callbacks.get(symbol)?.forEach((cb) => cb(data));
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket closed");
        this.reconnect(wsUrl);
      };
    }
  }

  private reconnect(url: string): void {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      console.log(`Reconnecting in ${delay}ms...`);
      setTimeout(() => this.connect(url, () => {}), delay);
    }
  }

  private transformData(data: any) {
    return {
      symbol: data.s,
      price: parseFloat(data.p),
      volume: parseFloat(data.q),
      timestamp: data.T,
    };
  }

  disconnect(symbol: string, callback: WebSocketCallback): void {
    this.callbacks.get(symbol)?.delete(callback);
    if (this.callbacks.get(symbol)?.size === 0) {
      this.callbacks.delete(symbol);
      if (this.callbacks.size === 0 && this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }
  }
}

export const marketWebSocket = MarketWebSocket.getInstance();
