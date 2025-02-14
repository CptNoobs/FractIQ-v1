import { binanceStream } from "./binance-stream";
import type {
  MarketUpdate,
  HistoricalData,
  MarketDataService as IMarketDataService,
} from "./types";
import { fetchKlines } from "../binance-api";

class MarketDataService implements IMarketDataService {
  private enabled = false;
  private cache = new Map<string, MarketUpdate>();
  private historicalCache = new Map<
    string,
    {
      data: HistoricalData[];
      timestamp: number;
    }
  >();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    binanceStream.cleanup();
    this.cache.clear();
    this.historicalCache.clear();
  }

  subscribe(symbol: string, handler: (data: MarketUpdate) => void) {
    if (!symbol || typeof symbol !== "string") return;
    if (!this.enabled) return;

    const upperSymbol = symbol.toUpperCase();

    // Send cached data immediately if available
    const cached = this.cache.get(upperSymbol);
    if (cached) {
      handler(cached);
    }

    // Subscribe to real-time updates
    binanceStream.subscribe(upperSymbol, (data) => {
      this.cache.set(upperSymbol, data);
      handler(data);
    });
  }

  unsubscribe(symbol: string, handler: (data: MarketUpdate) => void) {
    if (!symbol) return;
    binanceStream.unsubscribe(symbol.toUpperCase(), handler);
  }

  async getHistoricalData(
    symbol: string,
    timeframe: string,
    limit: number = 1000,
  ): Promise<HistoricalData[]> {
    const cacheKey = `${symbol}-${timeframe}-${limit}`;
    const cached = this.historicalCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    try {
      const data = await fetchKlines(symbol, timeframe, limit);
      this.historicalCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
      return data;
    } catch (error) {
      console.error(`Failed to fetch historical data for ${symbol}:`, error);
      throw error;
    }
  }

  getPrice(symbol: string): number | null {
    return this.cache.get(symbol.toUpperCase())?.price || null;
  }

  cleanup() {
    this.disable();
  }
}

export const marketData = new MarketDataService();

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
  private cache = new Map<string, MarketUpdate>();

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
    binanceStream.cleanup();
    this.cache.clear();
  }

  subscribe(symbol: string, handler: MarketDataHandler) {
    if (!symbol || typeof symbol !== "string") return;
    if (!this.enabled) return;

    const upperSymbol = symbol.toUpperCase();

    // Send cached data immediately if available
    const cached = this.cache.get(upperSymbol);
    if (cached) {
      handler(cached);
    }

    // Subscribe to real-time updates
    binanceStream.subscribe(upperSymbol, (data) => {
      this.cache.set(upperSymbol, data);
      handler(data);
    });
  }

  unsubscribe(symbol: string, handler: MarketDataHandler) {
    if (!symbol) return;
    binanceStream.unsubscribe(symbol.toUpperCase(), handler);
  }

  getPrice(symbol: string): number | null {
    return this.cache.get(symbol.toUpperCase())?.price || null;
  }

  cleanup() {
    this.disable();
  }
}

export const marketData = new MarketDataService();
