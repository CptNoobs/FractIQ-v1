import { useState, useCallback } from "react";
import { errorHandler } from "@/lib/error/error-handler";
import type { TradeEntry, JournalStats } from "@/types/journal";

export function useJournal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<JournalStats | null>(null);

  const getStats = useCallback(async (timeframe?: string) => {
    try {
      setLoading(true);
      setError(null);

      // Mock stats for now - replace with API call
      const mockStats: JournalStats = {
        totalTrades: 156,
        winRate: 72.5,
        profitFactor: 2.1,
        averageRR: 1.8,
        maxDrawdown: 12.5,
        bestPerformingPatterns: [
          { pattern: "Wave 3", winRate: 85, trades: 45 },
          { pattern: "Impulse", winRate: 78, trades: 32 },
          { pattern: "ABC Correction", winRate: 72, trades: 28 },
        ],
        psychologyInsights: [
          {
            aspect: "Risk Management",
            score: 8.5,
            improvement: "Consistent position sizing",
          },
          {
            aspect: "Emotional Control",
            score: 7.2,
            improvement: "Reduce FOMO trades",
          },
          {
            aspect: "Pattern Recognition",
            score: 8.8,
            improvement: "Strong wave analysis",
          },
        ],
      };

      setStats(mockStats);
    } catch (error: any) {
      const message = error.message || "Failed to load journal stats";
      setError(message);
      errorHandler.handleError(error, {
        category: "api",
        severity: "medium",
        context: { timeframe },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    loading,
    error,
    getStats,
  };
}
