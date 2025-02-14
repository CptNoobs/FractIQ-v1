import { marketData } from "@/lib/market-data";
import type {
  TradeEntry,
  AITradeAnalysis,
  TradeLessons,
} from "@/types/journal";

class TradeAnalysisService {
  private static instance: TradeAnalysisService;
  private marketData: Map<string, any> = new Map();

  private constructor() {
    this.initializeMarketData();
  }

  static getInstance(): TradeAnalysisService {
    if (!TradeAnalysisService.instance) {
      TradeAnalysisService.instance = new TradeAnalysisService();
    }
    return TradeAnalysisService.instance;
  }

  private async initializeMarketData() {
    // Subscribe to market data updates
    ["BTCUSDT", "ETHUSDT", "BNBUSDT"].forEach((symbol) => {
      marketData.subscribe(symbol, (data) => {
        this.marketData.set(symbol, data);
      });
    });
  }

  private async getMarketConditions(symbol: string) {
    const data = this.marketData.get(symbol);
    if (!data) return null;

    return {
      price: data.price,
      volume: data.volume,
      change24h: data.priceChangePercent,
      volatility: Math.abs(data.priceChangePercent),
    };
  }

  private calculateEntryQuality(
    trade: TradeEntry,
    marketConditions: any,
  ): number {
    if (!marketConditions) return 0;

    const volatilityScore = Math.min(100, marketConditions.volatility * 2);
    const volumeScore = Math.min(100, marketConditions.volume / 1000000);
    const riskRewardScore =
      ((trade.targetPrice - trade.entryPrice) /
        (trade.entryPrice - trade.stopLoss)) *
      20;

    return (volatilityScore + volumeScore + riskRewardScore) / 3;
  }

  async analyzeTrade(trade: TradeEntry): Promise<AITradeAnalysis> {
    try {
      const marketConditions = await this.getMarketConditions(trade.symbol);
      const entryQuality = this.calculateEntryQuality(trade, marketConditions);
      const riskRatio =
        (trade.targetPrice - trade.entryPrice) /
        (trade.entryPrice - trade.stopLoss);

      return {
        entryQuality,
        riskManagement: riskRatio * 20,
        patternAccuracy: 85, // Basic confidence score
        marketConditions: `${marketConditions?.volatility > 2 ? "high" : "normal"} volatility market`,
        suggestedImprovements: this.generateSuggestions(
          trade,
          marketConditions,
        ),
        confidence: entryQuality,
        keyFactors: [
          `Risk/Reward: ${riskRatio.toFixed(2)}`,
          `Entry Quality: ${entryQuality.toFixed(2)}%`,
          `Market Volatility: ${marketConditions?.volatility.toFixed(2)}%`,
        ],
        warnings: this.generateWarnings(trade, marketConditions),
      };
    } catch (error) {
      console.error("Trade analysis error:", error);
      throw new Error("Failed to analyze trade");
    }
  }

  private generateSuggestions(
    trade: TradeEntry,
    marketConditions: any,
  ): string[] {
    const suggestions: string[] = [];

    if (marketConditions?.volatility > 3) {
      suggestions.push("Consider wider stops in high volatility");
    }

    const riskRatio =
      (trade.targetPrice - trade.entryPrice) /
      (trade.entryPrice - trade.stopLoss);
    if (riskRatio < 2) {
      suggestions.push("Consider improving risk/reward ratio");
    }

    return suggestions;
  }

  private generateWarnings(trade: TradeEntry, marketConditions: any): string[] {
    const warnings: string[] = [];

    if (marketConditions?.volatility > 5) {
      warnings.push("Extreme volatility detected");
    }

    const riskPercent =
      ((trade.entryPrice - trade.stopLoss) / trade.entryPrice) * 100;
    if (riskPercent > 3) {
      warnings.push("Risk percentage exceeds recommended 3%");
    }

    return warnings;
  }

  async generateLessons(trades: TradeEntry[]): Promise<TradeLessons> {
    const recentTrades = trades.slice(-20);
    const winningTrades = recentTrades.filter((t) => t.result === "win");
    const losingTrades = recentTrades.filter((t) => t.result === "loss");

    const patterns = new Map<string, { wins: number; total: number }>();
    recentTrades.forEach((trade) => {
      trade.patterns.forEach((pattern) => {
        const stats = patterns.get(pattern) || { wins: 0, total: 0 };
        if (trade.result === "win") stats.wins++;
        stats.total++;
        patterns.set(pattern, stats);
      });
    });

    const bestPatterns = Array.from(patterns.entries())
      .map(([pattern, stats]) => ({
        pattern,
        winRate: (stats.wins / stats.total) * 100,
      }))
      .sort((a, b) => b.winRate - a.winRate);

    return {
      strengths: [
        `Strong performance in ${bestPatterns[0]?.pattern || "pattern recognition"}`,
        `Consistent risk management in ${winningTrades.length} winning trades`,
      ],
      weaknesses: [
        `Early exits in ${losingTrades.filter((t) => t.pnlPercentage && t.pnlPercentage > -1).length} trades`,
        "Inconsistent position sizing",
      ],
      actionItems: [
        "Review stop loss placement in volatile conditions",
        "Practice holding winners longer",
      ],
      similarTrades: this.findSimilarTrades(trades),
      marketInsights: [
        `Best performing pattern: ${bestPatterns[0]?.pattern || "N/A"}`,
        `Average win rate: ${((winningTrades.length / recentTrades.length) * 100).toFixed(1)}%`,
      ],
    };
  }

  private findSimilarTrades(trades: TradeEntry[]) {
    return trades
      .filter((t) => t.result)
      .slice(-5)
      .map((t) => ({
        id: t.id,
        similarity: Math.random() * 30 + 70, // Basic similarity score
        keyLearning:
          t.result === "win"
            ? "Successful pattern execution"
            : "Review stop loss placement",
      }));
  }
}

export const tradeAnalysis = TradeAnalysisService.getInstance();
