export interface UserSettings {
  trading: {
    defaultPositionSize: number;
    riskPerTrade: number;
    autoAdjustPosition: boolean;
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
    theme: "light" | "dark" | "matrix" | "system";
    chartStyle: "candlestick" | "line" | "area";
  };
}
