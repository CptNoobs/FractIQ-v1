import { Cache } from "../data/cache";
import type { MarketData } from "@/types/api";

class MarketDataCache {
  private static instance: MarketDataCache;
  private cache: Cache;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly OHLCV_TTL = 24 * 60 * 60 * 1000; // 24 hours for historical data

  private constructor() {
    this.cache = Cache.getInstance();
  }

  static getInstance(): MarketDataCache {
    if (!MarketDataCache.instance) {
      MarketDataCache.instance = new MarketDataCache();
    }
    return MarketDataCache.instance;
  }

  setMarketData(symbol: string, data: MarketData): void {
    const key = `market-data:${symbol}`;
    this.cache.set(key, data, this.CACHE_TTL);
  }

  getMarketData(symbol: string): MarketData | null {
    const key = `market-data:${symbol}`;
    return this.cache.get(key);
  }

  setOHLCV(symbol: string, timeframe: string, data: any[]): void {
    const key = `ohlcv:${symbol}:${timeframe}`;
    this.cache.set(key, data, this.OHLCV_TTL);
  }

  getOHLCV(symbol: string, timeframe: string): any[] | null {
    const key = `ohlcv:${symbol}:${timeframe}`;
    return this.cache.get(key);
  }

  invalidate(symbol: string): void {
    const keys = [`market-data:${symbol}`];
    keys.forEach((key) => this.cache.delete(key));
  }

  clear(): void {
    this.cache.clear();
  }
}

export const marketDataCache = MarketDataCache.getInstance();
