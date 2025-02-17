export interface TradeEntry {
  id: string;
  symbol: string;
  type: "long" | "short";
  entry: number;
  exit?: number;
  stopLoss: number;
  targetPrice: number;
  quantity: number;
  status: "open" | "closed";
  pnl?: number;
  riskRewardRatio: number;
  timestamp: string;
  notes?: string;
  tags?: string[];
  aiAnalysis?: {
    pattern?: string;
    confidence?: number;
    warnings?: string[];
    suggestedImprovements?: string[];
  };
}

export interface JournalStats {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  averageRR: number;
  maxDrawdown: number;
  bestPerformingPatterns: Array<{
    pattern: string;
    winRate: number;
    trades: number;
  }>;
  psychologyInsights: Array<{
    aspect: string;
    score: number;
    improvement: string;
  }>;
}
