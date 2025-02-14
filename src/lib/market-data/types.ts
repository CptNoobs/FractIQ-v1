export interface MarketUpdate {
  symbol: string;
  price: number;
  volume: number;
  priceChange: number;
  priceChangePercent: number;
  high: number;
  low: number;
  timestamp: number;
}

export interface HistoricalData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketDataService {
  enable(): void;
  disable(): void;
  subscribe(symbol: string, handler: (data: MarketUpdate) => void): void;
  unsubscribe(symbol: string, handler: (data: MarketUpdate) => void): void;
  getHistoricalData(
    symbol: string,
    timeframe: string,
    limit?: number,
  ): Promise<HistoricalData[]>;
  getPrice(symbol: string): number | null;
  cleanup(): void;
}
