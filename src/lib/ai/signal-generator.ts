import { marketDataCache } from "../market-data/cache";
import type { Signal } from "@/types/api";

type PatternType = "bullish" | "bearish" | "neutral";
type TimeFrame = "1h" | "4h" | "1d";

interface PatternResult {
  type: PatternType;
  confidence: number;
  description: string;
}

class SignalGenerator {
  private static instance: SignalGenerator;

  private constructor() {}

  static getInstance(): SignalGenerator {
    if (!SignalGenerator.instance) {
      SignalGenerator.instance = new SignalGenerator();
    }
    return SignalGenerator.instance;
  }

  async generateSignal(
    symbol: string,
    timeframe: TimeFrame = "4h",
  ): Promise<Signal> {
    const marketData = marketDataCache.getMarketData(symbol);
    const pattern = await this.detectPattern(symbol, timeframe);

    return {
      id: crypto.randomUUID(),
      symbol,
      type:
        pattern.type === "bullish"
          ? "buy"
          : pattern.type === "bearish"
            ? "sell"
            : "hold",
      confidence: pattern.confidence,
      price: marketData?.price || 0,
      timestamp: new Date().toISOString(),
      aiReason: pattern.description,
    };
  }

  private async detectPattern(
    symbol: string,
    timeframe: TimeFrame,
  ): Promise<PatternResult> {
    // Analyze technical indicators
    const technicals = await this.analyzeTechnicals(symbol);

    // Analyze wave patterns
    const wavePattern = await this.analyzeWavePattern(symbol);

    // Combine analyses
    const confidence = (technicals.confidence + wavePattern.confidence) / 2;
    const type = this.determineSignalType(technicals.type, wavePattern.type);

    return {
      type,
      confidence,
      description: `${wavePattern.description}. ${technicals.description}`,
    };
  }

  private async analyzeTechnicals(symbol: string): Promise<PatternResult> {
    // Simulate technical analysis
    const random = Math.random();
    let type: PatternType;
    let confidence: number;
    let description: string;

    if (random > 0.66) {
      type = "bullish";
      confidence = 75 + Math.random() * 20;
      description =
        "RSI showing oversold conditions with MACD bullish crossover";
    } else if (random > 0.33) {
      type = "bearish";
      confidence = 75 + Math.random() * 20;
      description = "RSI in overbought territory with bearish divergence";
    } else {
      type = "neutral";
      confidence = 50 + Math.random() * 25;
      description = "Mixed signals with consolidating price action";
    }

    return { type, confidence, description };
  }

  private async analyzeWavePattern(symbol: string): Promise<PatternResult> {
    // Simulate wave pattern analysis
    const random = Math.random();
    let type: PatternType;
    let confidence: number;
    let description: string;

    if (random > 0.66) {
      type = "bullish";
      confidence = 80 + Math.random() * 15;
      description = "Wave 3 impulse pattern detected with strong momentum";
    } else if (random > 0.33) {
      type = "bearish";
      confidence = 80 + Math.random() * 15;
      description = "Completing 5th wave, expecting corrective move";
    } else {
      type = "neutral";
      confidence = 60 + Math.random() * 20;
      description = "Complex correction pattern in progress";
    }

    return { type, confidence, description };
  }

  private determineSignalType(
    technical: PatternType,
    wave: PatternType,
  ): PatternType {
    if (technical === wave) return technical;
    if (technical === "neutral" || wave === "neutral") return "neutral";
    return "neutral";
  }
}

export const signalGenerator = SignalGenerator.getInstance();
