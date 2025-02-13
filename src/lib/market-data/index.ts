import { BehaviorSubject } from "rxjs";

interface MarketState {
  price: number;
  volume: number;
  change24h: number;
  high24h: number;
  low24h: number;
  lastUpdate: number;
}

class MarketDataService {
  private state = new Map<string, BehaviorSubject<MarketState>>();
  private ws: WebSocket | null = null;
  private reconnectTimer: number | null = null;
  private isConnected = false;

  constructor() {
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    try {
      this.ws = new WebSocket("wss://stream.binance.com:9443/ws");

      this.ws.onopen = () => {
        this.isConnected = true;
        this.subscribeToSymbols();
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.reconnect();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
      this.reconnect();
    }
  }

  private reconnect() {
    if (this.reconnectTimer) return;

    this.reconnectTimer = window.setTimeout(() => {
      this.initializeWebSocket();
      this.reconnectTimer = null;
    }, 5000);
  }

  private handleMessage(data: any) {
    if (!data.s || !data.c) return;

    const symbol = data.s;
    const subject = this.getSubject(symbol);

    subject.next({
      price: parseFloat(data.c),
      volume: parseFloat(data.v),
      change24h: parseFloat(data.p),
      high24h: parseFloat(data.h),
      low24h: parseFloat(data.l),
      lastUpdate: Date.now(),
    });
  }

  private getSubject(symbol: string) {
    if (!this.state.has(symbol)) {
      this.state.set(
        symbol,
        new BehaviorSubject<MarketState>({
          price: 0,
          volume: 0,
          change24h: 0,
          high24h: 0,
          low24h: 0,
          lastUpdate: 0,
        }),
      );
    }
    return this.state.get(symbol)!;
  }

  private subscribeToSymbols() {
    if (!this.ws || !this.isConnected) return;

    const symbols = Array.from(this.state.keys());
    if (symbols.length === 0) return;

    const subscribeMsg = {
      method: "SUBSCRIBE",
      params: symbols.map((s) => `${s.toLowerCase()}@ticker`),
      id: Date.now(),
    };

    this.ws.send(JSON.stringify(subscribeMsg));
  }

  subscribe(symbol: string, callback: (data: MarketState) => void) {
    const subject = this.getSubject(symbol);
    const subscription = subject.subscribe(callback);

    if (this.isConnected) {
      this.subscribeToSymbols();
    }

    return () => subscription.unsubscribe();
  }

  cleanup() {
    if (this.ws) {
      this.ws.close();
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.state.clear();
  }
}

export const marketData = new MarketDataService();
