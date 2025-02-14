interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class MarketDataCache {
  private static instance: MarketDataCache;
  private cache: Map<string, CacheEntry<any>> = new Map();
  private maxAge = 5000; // 5 seconds

  private constructor() {}

  static getInstance(): MarketDataCache {
    if (!MarketDataCache.instance) {
      MarketDataCache.instance = new MarketDataCache();
    }
    return MarketDataCache.instance;
  }

  set(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear() {
    this.cache.clear();
  }
}

export const marketCache = MarketDataCache.getInstance();
