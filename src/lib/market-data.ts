import { BehaviorSubject } from "rxjs";

type MarketDataHandler = (data: MarketUpdate) => void;

interface MarketUpdate {
  symbol: string;
  price: number;
  volume: number;
  priceChange: number;
  priceChangePercent: number;
  high: number;
  low: number;
  timestamp: number;
}

class MarketDataService {
  private enabled = false;
  private ws: WebSocket | null = null;
  private handlers = new Map<string, Set<MarketDataHandler>>();
  private cache = new Map<string, MarketUpdate>();

  enable() {
    this.enabled = true;
    this.connect();
  }

  disable() {
    this.enabled = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.handlers.clear();
    this.cache.clear();
  }

  private connect() {
    if (!this.enabled || this.ws?.readyState === WebSocket.OPEN) return;

    const symbols = Array.from(this.handlers.keys());
    if (symbols.length === 0) return;

    const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    const wsUrl = `wss://stream.binance.com/stream?streams=${streams}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("Market data connected");
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.data) {
          const update = this.processMarketData(message.data);
          this.cache.set(update.symbol, update);
          this.notifyHandlers(update);
        }
      } catch (error) {
        console.error("Error processing market data:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("Market data disconnected");
      setTimeout(() => this.connect(), 5000);
    };
  }

  private processMarketData(data: any): MarketUpdate {
    return {
      symbol: data.s,
      price: parseFloat(data.c),
      volume: parseFloat(data.v),
      priceChange: parseFloat(data.p),
      priceChangePercent: parseFloat(data.P),
      high: parseFloat(data.h),
      low: parseFloat(data.l),
      timestamp: Date.now(),
    };
  }

  subscribe(symbol: string, handler: MarketDataHandler) {
    if (!symbol || typeof symbol !== "string") return;

    const upperSymbol = symbol.toUpperCase();
    if (!this.handlers.has(upperSymbol)) {
      this.handlers.set(upperSymbol, new Set());
    }

    this.handlers.get(upperSymbol)?.add(handler);

    // Send cached data if available
    const cached = this.cache.get(upperSymbol);
    if (cached) {
      handler(cached);
    }

    // Reconnect with new symbol if needed
    if (this.enabled) {
      this.connect();
    }
  }

  unsubscribe(symbol: string, handler: MarketDataHandler) {
    if (!symbol) return;

    const upperSymbol = symbol.toUpperCase();
    this.handlers.get(upperSymbol)?.delete(handler);

    if (this.handlers.get(upperSymbol)?.size === 0) {
      this.handlers.delete(upperSymbol);
      this.cache.delete(upperSymbol);
      // Reconnect with updated symbol list
      if (this.enabled) {
        this.connect();
      }
    }
  }

  private notifyHandlers(update: MarketUpdate) {
    const handlers = this.handlers.get(update.symbol);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(update);
        } catch (error) {
          console.error("Handler error:", error);
        }
      });
    }
  }
}

export const marketData = new MarketDataService();
