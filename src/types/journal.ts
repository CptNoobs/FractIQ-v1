export type TradeStatus = "planned" | "active" | "completed" | "cancelled";
export type TradeSentiment = "bullish" | "bearish" | "neutral";
export type TradeResult = "win" | "loss" | "breakeven";

export interface TradeEntry {
  id: string;
  symbol: string;
  status: TradeStatus;
  type: "long" | "short";
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  quantity: number;
  leverage?: number;
  timestamp: number;
  closeTimestamp?: number;
  result?: TradeResult;
  pnl?: number;
  pnlPercentage?: number;
  notes: string;
  tags: string[];
  sentiment: TradeSentiment;
  confidence: number;
  screenshots?: string[];
  patterns: string[];
  indicators: Record<string, number | string>;
  aiAnalysis?: AITradeAnalysis;
  lessons?: TradeLessons;
}

export interface AITradeAnalysis {
  entryQuality: number;
  riskManagement: number;
  patternAccuracy: number;
  marketConditions: string;
  suggestedImprovements: string[];
  confidence: number;
  keyFactors: string[];
  warnings?: string[];
}

export interface TradeLessons {
  strengths: string[];
  weaknesses: string[];
  actionItems: string[];
  similarTrades?: {
    id: string;
    similarity: number;
    keyLearning: string;
  }[];
  marketInsights: string[];
}

export interface JournalStats {
  totalTrades: number;
  winRate: number;
  averageRR: number;
  profitFactor: number;
  largestWin: number;
  largestLoss: number;
  averageHoldingTime: number;
  bestPerformingPatterns: Array<{
    pattern: string;
    winRate: number;
    trades: number;
  }>;
  worstPerformingPatterns: Array<{
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

export interface TradeReview {
  id: string;
  tradeId: string;
  timestamp: number;
  emotionalState: string;
  preTradeChecklist: Record<string, boolean>;
  postTradeAnalysis: {
    followedPlan: boolean;
    emotionalControl: number;
    technicalExecution: number;
    notes: string;
  };
  aiRecommendations: string[];
  improvementAreas: string[];
}
