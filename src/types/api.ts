export interface Signal {
  id: string;
  symbol: string;
  type: "buy" | "sell" | "hold";
  confidence: number;
  price: number;
  timestamp: string;
  aiReason?: string;
}

export interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  change24h: number;
  high24h: number;
  low24h: number;
  timestamp: number;
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
    apiKeys: string[];
  };
  appearance: {
    theme: "light" | "dark" | "system" | "matrix";
    chartStyle: "candlestick" | "line" | "area";
  };
}
