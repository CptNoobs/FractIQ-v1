import { basicWaveDetector } from "../wave-analysis/basic-wave-detector";
import { eventBus } from "../event-bus";
import { metrics } from "../metrics";
import { notifications } from "../notifications";
import { marketData } from "../market-data";

export interface TradeSignal {
  symbol: string;
  type: "buy" | "sell";
  entryPrice: number;
  stopLoss: number;
  targets: number[];
  confidence: number;
  wave: {
    number: number;
    subWave: string;
    pattern: string;
  };
  timeframe: string;
  timestamp: number;
}

class SignalGenerator {
  private static instance: SignalGenerator;
  private activeSymbols: Set<string> = new Set();
  private subscribers: Map<string, Set<(signal: TradeSignal) => void>> =
    new Map();

  private constructor() {
    this.initializeSignalGenerator();
  }

  static getInstance(): SignalGenerator {
    if (!SignalGenerator.instance) {
      SignalGenerator.instance = new SignalGenerator();
    }
    return SignalGenerator.instance;
  }

  private async initializeSignalGenerator() {
    // Start monitoring default symbols
    this.addSymbol("BTCUSDT");
    this.addSymbol("ETHUSDT");
  }

  addSymbol(symbol: string) {
    if (this.activeSymbols.has(symbol)) return;

    this.activeSymbols.add(symbol);
    marketData.subscribe(symbol, async (data) => {
      await this.analyzeMarket(symbol, data);
    });
  }

  private lastAnalysis: Map<
    string,
    { timestamp: number; signal: TradeSignal }
  > = new Map();
  private analysisThrottleTime = 30000; // 30 seconds for more frequent signals
  private readonly MIN_PATTERN_CONFIDENCE = 70; // Minimum pattern confidence

  private async analyzeMarket(symbol: string, data: any) {
    const lastAnalysis = this.lastAnalysis.get(symbol);
    if (
      lastAnalysis &&
      Date.now() - lastAnalysis.timestamp < this.analysisThrottleTime
    ) {
      return; // Skip analysis if too recent
    }

    try {
      // Detect Elliott Wave pattern
      const wavePattern = await basicWaveDetector.detectWavePattern(symbol);

      // Generate signal if conditions align
      if (wavePattern.confidence >= this.MIN_PATTERN_CONFIDENCE) {
        const signal = await this.generateSignal(symbol, wavePattern, data);

        // Emit signal event with proper typing
        eventBus.emit(
          "SIGNAL_GENERATED",
          { signal, timestamp: Date.now() },
          "signal-generator",
        );

        // Notify subscribers
        this.lastAnalysis.set(symbol, { timestamp: Date.now(), signal });
        this.notifySubscribers(symbol, signal);

        // Send notification if high confidence
        if (signal.confidence > 80) {
          notifications.notifyTradeInsight(
            `High confidence ${signal.type} signal on ${symbol}`,
            "high",
            signal,
          );
        }

        // Record metrics
        metrics.record("signal_confidence", signal.confidence, {
          symbol,
          type: signal.type,
          wave: `${signal.wave.number}${signal.wave.subWave}`,
        });
      }
    } catch (error) {
      console.error("Signal generation error:", error);
    }
  }

  private async generateSignal(
    symbol: string,
    wavePattern: any,
    marketData: any,
  ): Promise<TradeSignal> {
    const direction = wavePattern.direction === "up" ? "buy" : "sell";
    const targets = this.calculateTargets(
      direction,
      marketData.price,
      wavePattern,
    );

    return {
      symbol,
      type: direction,
      entryPrice: marketData.price,
      stopLoss: this.calculateStopLoss(
        direction,
        marketData.price,
        wavePattern,
      ),
      targets,
      confidence: wavePattern.confidence,
      wave: {
        number: wavePattern.currentWave,
        subWave: wavePattern.subWave,
        pattern: wavePattern.pattern,
      },
      timeframe: "4h",
      timestamp: Date.now(),
    };
  }

  private calculateStopLoss(
    direction: "buy" | "sell",
    currentPrice: number,
    wavePattern: any,
  ): number {
    // Implement stop loss calculation based on wave pattern
    return direction === "buy" ? currentPrice * 0.95 : currentPrice * 1.05;
  }

  private calculateTargets(
    direction: "buy" | "sell",
    currentPrice: number,
    wavePattern: any,
  ): number[] {
    // Implement target calculation based on wave pattern
    return direction === "buy"
      ? [currentPrice * 1.05, currentPrice * 1.1, currentPrice * 1.15]
      : [currentPrice * 0.95, currentPrice * 0.9, currentPrice * 0.85];
  }

  subscribe(symbol: string, callback: (signal: TradeSignal) => void) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol)?.add(callback);

    // Start monitoring if not already
    this.addSymbol(symbol);

    return () => {
      this.subscribers.get(symbol)?.delete(callback);
    };
  }

  cleanup() {
    this.activeSymbols.clear();
    this.subscribers.clear();
    this.lastAnalysis.clear();
  }

  private notifySubscribers(symbol: string, signal: TradeSignal) {
    this.subscribers.get(symbol)?.forEach((callback) => {
      try {
        callback(signal);
      } catch (error) {
        console.error("Error in signal subscriber:", error);
      }
    });
  }
}

export const signalGenerator = SignalGenerator.getInstance();
