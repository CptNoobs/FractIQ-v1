export interface TradeSignal {
  symbol: string;
  type: "buy" | "sell";
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  confidence: number;
  wave: {
    number: number;
    subWave: string;
    pattern: string;
  };
  timeframe: string;
  timestamp: number;
  metadata?: {
    volume?: number;
    volatility?: number;
    momentum?: number;
    riskRewardRatio?: number;
  };
}

export interface SignalConfig {
  minConfidence: number;
  maxSignalsPerHour: number;
  minVolume: number;
  minRiskRewardRatio: number;
}

export interface SignalGenerator {
  addSymbol(symbol: string): void;
  removeSymbol(symbol: string): void;
  subscribe(
    symbol: string,
    callback: (signal: TradeSignal) => void,
  ): () => void;
  updateConfig(config: Partial<SignalConfig>): void;
  cleanup(): void;
}
