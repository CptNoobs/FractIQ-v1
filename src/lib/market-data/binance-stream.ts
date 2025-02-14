type Handler = (data: any) => void;

export class BinanceStream {
  private ws: WebSocket | null = null;
  private handlers = new Map<string, Set<Handler>>();
  private reconnectTimer: number | null = null;

  connect(symbols: string[]) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.close();
    }

    const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    this.ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const symbol = data.s;
        const handlers = this.handlers.get(symbol);
        if (handlers) {
          const update = {
            symbol,
            price: parseFloat(data.c),
            priceChange: parseFloat(data.p),
            priceChangePercent: parseFloat(data.P),
            volume: parseFloat(data.v),
            high: parseFloat(data.h),
            low: parseFloat(data.l),
            timestamp: Date.now(),
          };
          handlers.forEach((handler) => handler(update));
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.reconnect();
    };

    this.ws.onclose = () => {
      this.reconnect();
    };
  }

  private reconnect() {
    if (this.reconnectTimer) return;

    this.reconnectTimer = window.setTimeout(() => {
      const symbols = Array.from(this.handlers.keys());
      if (symbols.length > 0) {
        this.connect(symbols);
      }
      this.reconnectTimer = null;
    }, 5000);
  }

  subscribe(symbol: string, handler: Handler) {
    if (!symbol || typeof symbol !== "string") return;

    const upperSymbol = symbol.toUpperCase();
    if (!this.handlers.has(upperSymbol)) {
      this.handlers.set(upperSymbol, new Set());
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.connect(Array.from(this.handlers.keys()));
      }
    }
    this.handlers.get(upperSymbol)?.add(handler);
  }

  unsubscribe(symbol: string, handler: Handler) {
    if (!symbol) return;

    const upperSymbol = symbol.toUpperCase();
    this.handlers.get(upperSymbol)?.delete(handler);
    if (this.handlers.get(upperSymbol)?.size === 0) {
      this.handlers.delete(upperSymbol);
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.connect(Array.from(this.handlers.keys()));
      }
    }
  }

  cleanup() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.handlers.clear();
  }
}

export const binanceStream = new BinanceStream();
