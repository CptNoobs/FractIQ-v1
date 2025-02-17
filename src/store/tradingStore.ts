import { create } from "zustand";

type TradingState = {
  insights: Array<{
    id: string;
    title: string;
    description: string;
    confidence: number;
    type: "buy" | "sell" | "hold";
    timestamp: string;
  }>;
  marketData: {
    symbol: string;
    price: number;
    change24h: number;
    volume: number;
  };
  setInsights: (insights: any[]) => void;
  setMarketData: (data: any) => void;
};

export const useTradingStore = create<TradingState>((set) => ({
  insights: [],
  marketData: {
    symbol: "BTCUSDT",
    price: 0,
    change24h: 0,
    volume: 0,
  },
  setInsights: (insights) => set({ insights }),
  setMarketData: (data) => set({ marketData: data }),
}));
