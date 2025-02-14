import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tradeAnalysis } from "@/lib/ai/trade-analysis";

import { notifications } from "@/lib/notifications";
import type { TradeEntry, JournalStats, TradeReview } from "@/types/journal";

interface AppState {
  trades: TradeEntry[];
  reviews: TradeReview[];
  stats: JournalStats | null;
  loading: boolean;
  error: string | null;
  addTrade: (trade: TradeEntry) => Promise<void>;
  updateTrade: (id: string, trade: Partial<TradeEntry>) => Promise<void>;
  deleteTrade: (id: string) => Promise<void>;
  addReview: (review: TradeReview) => Promise<void>;
  getStats: (timeframe?: string) => Promise<void>;
  analyzeTrade: (trade: TradeEntry) => Promise<void>;
}

export const useStore = create<AppState>(
  persist(
    (set, get) => ({
      trades: [],
      reviews: [],
      stats: null,
      loading: false,
      error: null,

      addTrade: async (trade) => {
        try {
          set({ loading: true, error: null });

          // Analyze trade with AI
          const analysis = await tradeAnalysis.analyzeTrade(trade);
          const newTrade = {
            ...trade,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            aiAnalysis: analysis,
          };

          // Add trade to store
          set((state) => ({
            trades: [...state.trades, newTrade],
          }));

          // Notify if high confidence pattern detected
          if (analysis.patternAccuracy > 80) {
            notifications.notifyPatternDetected(
              analysis.keyFactors[0],
              trade.symbol,
              analysis.patternAccuracy,
            );
          }

          await get().getStats();
        } catch (error) {
          set({ error: "Failed to add trade" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      updateTrade: async (id, updates) => {
        try {
          set({ loading: true, error: null });
          set((state) => ({
            trades: state.trades.map((t) =>
              t.id === id ? { ...t, ...updates } : t,
            ),
          }));
          await get().getStats();
        } catch (error) {
          set({ error: "Failed to update trade" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      deleteTrade: async (id) => {
        try {
          set({ loading: true, error: null });
          set((state) => ({
            trades: state.trades.filter((t) => t.id !== id),
          }));
          await get().getStats();
        } catch (error) {
          set({ error: "Failed to delete trade" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      addReview: async (review) => {
        try {
          set({ loading: true, error: null });
          const newReview = {
            ...review,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          };
          set((state) => ({
            reviews: [...state.reviews, newReview],
          }));

          // Generate AI insights based on review
          const trade = get().trades.find((t) => t.id === review.tradeId);
          if (trade) {
            const lessons = await tradeAnalysis.generateLessons([trade]);
            await get().updateTrade(trade.id, { lessons });
          }
        } catch (error) {
          set({ error: "Failed to add review" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      analyzeTrade: async (trade) => {
        try {
          set({ loading: true, error: null });
          const analysis = await tradeAnalysis.analyzeTrade(trade);
          await get().updateTrade(trade.id, { aiAnalysis: analysis });
        } catch (error) {
          set({ error: "Failed to analyze trade" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      getStats: async (timeframe = "30d") => {
        try {
          set({ loading: true, error: null });
          const trades = get().trades;
          const stats = await tradeAnalysis.generateLessons(trades);
          set({ stats });
        } catch (error) {
          set({ error: "Failed to calculate stats" });
          throw error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "trade-journal",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
