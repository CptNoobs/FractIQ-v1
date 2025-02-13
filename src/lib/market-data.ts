type MarketDataHandler = (data: any) => void;

export class MarketDataService {
  private enabled: boolean = true;
  private ws: WebSocket | null = null;
  private handlers: Map<string, Set<MarketDataHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private symbols: string[] = [];

  connect(symbols: string[] = ["btcusdt", "ethusdt", "bnbusdt", "neousdt"]) {
    if (!this.enabled) return;

    this.symbols = symbols;
    const streams = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("Market data WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.data) {
          this.notifyHandlers(message.data);
        }
      } catch (error) {
        console.error("Error parsing market data:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("Market data WebSocket disconnected");
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error("Market data WebSocket error:", error);
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts})...`);
        this.connect(this.symbols);
      }, 1000 * this.reconnectAttempts);
    }
  }

  subscribe(symbol: string, handler: MarketDataHandler) {
    if (!this.handlers.has(symbol)) {
      this.handlers.set(symbol, new Set());
    }
    this.handlers.get(symbol)?.add(handler);

    // If symbol not in current streams, reconnect with new symbol
    if (!this.symbols.includes(symbol.toLowerCase())) {
      this.symbols.push(symbol.toLowerCase());
      if (this.ws) {
        this.ws.close();
        this.connect(this.symbols);
      }
    }
  }

  unsubscribe(symbol: string, handler: MarketDataHandler) {
    this.handlers.get(symbol)?.delete(handler);
    if (this.handlers.get(symbol)?.size === 0) {
      this.handlers.delete(symbol);
      this.symbols = this.symbols.filter((s) => s !== symbol.toLowerCase());
      if (this.ws) {
        this.ws.close();
        this.connect(this.symbols);
      }
    }
  }

  private notifyHandlers(data: any) {
    const symbol = data.s;
    const handlers = this.handlers.get(symbol);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler({
            symbol: data.s,
            price: parseFloat(data.c),
            priceChange: parseFloat(data.p),
            priceChangePercent: parseFloat(data.P),
            volume: parseFloat(data.v),
            high: parseFloat(data.h),
            low: parseFloat(data.l),
          });
        } catch (error) {
          console.error("Error in market data handler:", error);
        }
      });
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create singleton instance
export const marketData = new MarketDataService();

// Add enable/disable methods
marketData.enable = function () {
  this.enabled = true;
  this.connect();
};

marketData.disable = function () {
  this.enabled = false;
  this.disconnect();
};
