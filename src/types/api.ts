export interface MarketData {
  symbol: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Signal {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  confidence: number;
  timestamp: number;
  price: number;
  pattern: string;
  wave: number;
  subWave: string;
}

export interface RiskParameters {
  stopLoss: number;
  takeProfit: number;
  positionSize: number;
  riskRewardRatio: number;
  maxLoss: number;
}

export interface PatternAnalysis {
  pattern: string;
  confidence: number;
  wave: number;
  subWave: string;
  direction: "up" | "down";
  targets: {
    entry: number;
    stopLoss: number;
    takeProfit: number;
  };
}

export interface AIInsight {
  symbol: string;
  sentiment: number;
  trendStrength: number;
  support: number;
  resistance: number;
  patterns: PatternAnalysis[];
  prediction: {
    direction: "up" | "down";
    probability: number;
    targetPrice: number;
    timeframe: string;
  };
}

export interface UserSettings {
  trading: {
    defaultPositionSize: number;
    riskPerTrade: number;
    autoAdjustPosition: boolean;
    publicDataStream: boolean;
  };
  ai: {
    minConfidence: number;
    patternSensitivity: "low" | "medium" | "high";
    autoUpdateModels: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    signals: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    apiKeys: Array<{
      name: string;
      key: string;
      permissions: string[];
    }>;
  };
  appearance: {
    theme: "light" | "dark" | "matrix" | "system";
    chartStyle: "candlestick" | "line" | "area";
  };
}
