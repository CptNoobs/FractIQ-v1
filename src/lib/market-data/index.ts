import { wsPool } from "../websocket-pool";
import { marketDataCache } from "./cache";
import type { MarketData } from "@/types/api";

class MarketDataService {
  private static instance: MarketDataService;
  private subscribers: Map<string, Set<(data: MarketData) => void>> = new Map();
  private enabled = false;

  private constructor() {}

  static getInstance(): MarketDataService {
    if (!MarketDataService.instance) {
      MarketDataService.instance = new MarketDataService();
    }
    return MarketDataService.instance;
  }

  enable(): void {
    if (this.enabled) return;
    this.enabled = true;
    console.log("Market data service enabled");
  }

  disable(): void {
    if (!this.enabled) return;
    this.enabled = false;
    this.subscribers.clear();
    console.log("Market data service disabled");
  }

  subscribe(symbol: string, callback: (data: MarketData) => void): void {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol)?.add(callback);

    // Check cache first
    const cachedData = marketDataCache.getMarketData(symbol);
    if (cachedData) {
      callback(cachedData);
    }

    // Connect to WebSocket for real-time updates
    wsPool.connect(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`,
      {
        onMessage: (data) => {
          const marketData = this.transformData(data);
          // Update cache
          marketDataCache.setMarketData(symbol, marketData);
          this.notifySubscribers(symbol, marketData);
        },
      },
    );
  }

  unsubscribe(symbol: string, callback: (data: MarketData) => void): void {
    this.subscribers.get(symbol)?.delete(callback);
    if (this.subscribers.get(symbol)?.size === 0) {
      wsPool.disconnect(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`,
      );
    }
  }

  async getOHLCV(symbol: string, timeframe: string): Promise<any[]> {
    // Check cache first
    const cachedData = marketDataCache.getOHLCV(symbol, timeframe);
    if (cachedData) {
      return cachedData;
    }

    // Fetch from API if not in cache
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=1000`,
      );
      const data = await response.json();

      // Cache the data
      marketDataCache.setOHLCV(symbol, timeframe, data);
      return data;
    } catch (error) {
      console.error(`Failed to fetch OHLCV data for ${symbol}:`, error);
      throw error;
    }
  }

  private transformData(data: any): MarketData {
    return {
      symbol: data.s,
      price: parseFloat(data.c),
      volume: parseFloat(data.v),
      change24h: parseFloat(data.P),
      high24h: parseFloat(data.h),
      low24h: parseFloat(data.l),
      timestamp: data.E,
    };
  }

  private notifySubscribers(symbol: string, data: MarketData): void {
    this.subscribers.get(symbol)?.forEach((callback) => callback(data));
  }

  invalidateCache(symbol: string): void {
    marketDataCache.invalidate(symbol);
  }

  clearCache(): void {
    marketDataCache.clear();
  }
}

export const marketData = MarketDataService.getInstance();
