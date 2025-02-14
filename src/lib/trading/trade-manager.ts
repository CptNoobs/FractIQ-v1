import { marketData } from "../market-data";
import { notifications } from "../notifications";
import { tradeAnalysis } from "../ai/trade-analysis";
import type { TradeEntry } from "@/types/journal";

class TradeManager {
  private static instance: TradeManager;
  private activeTrades = new Map<string, TradeEntry>();
  private subscribers = new Map<string, Set<(trade: TradeEntry) => void>>();
  private tradeHistory = new Map<string, TradeEntry[]>();

  private constructor() {
    this.initializeTradeManager();
  }

  static getInstance(): TradeManager {
    if (!TradeManager.instance) {
      TradeManager.instance = new TradeManager();
    }
    return TradeManager.instance;
  }

  private async initializeTradeManager() {
    marketData.enable();
    this.loadTradeHistory();
  }

  private loadTradeHistory() {
    const history = localStorage.getItem("trade_history");
    if (history) {
      const parsed = JSON.parse(history);
      Object.entries(parsed).forEach(([symbol, trades]) => {
        this.tradeHistory.set(symbol, trades as TradeEntry[]);
      });
    }
  }

  private saveTradeHistory() {
    const history: Record<string, TradeEntry[]> = {};
    this.tradeHistory.forEach((trades, symbol) => {
      history[symbol] = trades;
    });
    localStorage.setItem("trade_history", JSON.stringify(history));
  }

  async openTrade(trade: TradeEntry) {
    if (this.activeTrades.has(trade.id)) return;

    // Analyze trade with AI before opening
    const analysis = await tradeAnalysis.analyzeTrade(trade);
    const enrichedTrade = { ...trade, aiAnalysis: analysis };

    this.activeTrades.set(trade.id, enrichedTrade);
    this.monitorTrade(enrichedTrade);

    // Add to history
    const symbolHistory = this.tradeHistory.get(trade.symbol) || [];
    this.tradeHistory.set(trade.symbol, [...symbolHistory, enrichedTrade]);
    this.saveTradeHistory();

    notifications.notify(
      "Trade Opened",
      `${trade.type.toUpperCase()} ${trade.symbol} at ${trade.entryPrice}`,
      analysis.confidence > 80 ? "success" : "info",
    );

    return enrichedTrade;
  }

  private monitorTrade(trade: TradeEntry) {
    marketData.subscribe(trade.symbol, (data) => {
      const currentPrice = data.price;
      const pnl = this.calculatePnL(trade, currentPrice);
      const updatedTrade = { ...trade, currentPrice, pnl };

      // Check stop loss and take profit
      if (this.shouldCloseTrade(updatedTrade)) {
        this.closeTrade(trade.id, currentPrice);
      }

      // Check for pattern changes
      this.checkPatternChanges(updatedTrade);

      this.notifySubscribers(trade.id, updatedTrade);
    });
  }

  private async checkPatternChanges(trade: TradeEntry) {
    const analysis = await tradeAnalysis.analyzeTrade(trade);
    if (
      analysis.confidence > 80 &&
      analysis.pattern !== trade.aiAnalysis?.pattern
    ) {
      notifications.notifyPatternDetected(
        analysis.pattern,
        trade.symbol,
        analysis.confidence,
      );
    }
  }

  private calculatePnL(trade: TradeEntry, currentPrice: number): number {
    const direction = trade.type === "long" ? 1 : -1;
    const priceDiff = currentPrice - trade.entryPrice;
    return priceDiff * direction * trade.quantity * (trade.leverage || 1);
  }

  private shouldCloseTrade(trade: TradeEntry): boolean {
    if (!trade.currentPrice) return false;

    // Check stop loss
    if (trade.type === "long") {
      if (trade.currentPrice <= trade.stopLoss) {
        return true;
      }
    } else {
      if (trade.currentPrice >= trade.stopLoss) {
        return true;
      }
    }

    // Check take profit
    if (trade.type === "long") {
      if (trade.currentPrice >= trade.targetPrice) {
        return true;
      }
    } else {
      if (trade.currentPrice <= trade.targetPrice) {
        return true;
      }
    }

    return false;
  }

  async closeTrade(tradeId: string, closePrice: number) {
    const trade = this.activeTrades.get(tradeId);
    if (!trade) return;

    const finalPnL = this.calculatePnL(trade, closePrice);
    const result = finalPnL > 0 ? "win" : finalPnL < 0 ? "loss" : "breakeven";

    const closedTrade = {
      ...trade,
      status: "completed" as const,
      closePrice,
      closeTimestamp: Date.now(),
      pnl: finalPnL,
      pnlPercentage: (finalPnL / (trade.entryPrice * trade.quantity)) * 100,
      result,
    };

    // Update history
    const symbolHistory = this.tradeHistory.get(trade.symbol) || [];
    const updatedHistory = symbolHistory.map((t) =>
      t.id === tradeId ? closedTrade : t,
    );
    this.tradeHistory.set(trade.symbol, updatedHistory);
    this.saveTradeHistory();

    // Cleanup
    this.activeTrades.delete(tradeId);
    marketData.unsubscribe(trade.symbol, () => {});

    // Generate trade review
    const analysis = await tradeAnalysis.analyzeTrade(closedTrade);
    const notification = result === "win" ? "success" : "warning";

    notifications.notify(
      "Trade Closed",
      `${trade.symbol} closed with ${finalPnL > 0 ? "profit" : "loss"}: $${Math.abs(finalPnL).toFixed(2)}`,
      notification,
    );

    return { ...closedTrade, aiAnalysis: analysis };
  }

  getTradeHistory(symbol?: string): TradeEntry[] {
    if (symbol) {
      return this.tradeHistory.get(symbol) || [];
    }
    return Array.from(this.tradeHistory.values()).flat();
  }

  subscribe(tradeId: string, callback: (trade: TradeEntry) => void) {
    if (!this.subscribers.has(tradeId)) {
      this.subscribers.set(tradeId, new Set());
    }
    this.subscribers.get(tradeId)?.add(callback);
  }

  private notifySubscribers(tradeId: string, trade: TradeEntry) {
    this.subscribers.get(tradeId)?.forEach((callback) => {
      try {
        callback(trade);
      } catch (error) {
        console.error("Error in trade subscriber:", error);
      }
    });
  }

  cleanup() {
    this.activeTrades.clear();
    this.subscribers.clear();
    this.saveTradeHistory();
  }
}

export const tradeManager = TradeManager.getInstance();
