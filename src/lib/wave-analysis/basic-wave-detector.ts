import { marketData } from "../market-data";
import { eventBus } from "../event-bus";

export interface WavePoint {
  price: number;
  time: number;
  waveNumber: number;
  subWave: string;
  confidence: number;
}

export interface WavePattern {
  points: WavePoint[];
  currentWave: number;
  subWave: string;
  confidence: number;
  direction: "up" | "down";
  targets: Array<{
    price: number;
    probability: number;
    timeframe: string;
  }>;
}

class BasicWaveDetector {
  private static instance: BasicWaveDetector;

  private constructor() {}

  static getInstance(): BasicWaveDetector {
    if (!BasicWaveDetector.instance) {
      BasicWaveDetector.instance = new BasicWaveDetector();
    }
    return BasicWaveDetector.instance;
  }

  async detectWavePattern(
    symbol: string,
    timeframe: string = "4h",
  ): Promise<WavePattern> {
    const data = await this.prepareData(symbol, timeframe);
    return this.analyzeWavePattern(data);
  }

  private async prepareData(symbol: string, timeframe: string) {
    try {
      const data = await marketData.getHistoricalData(symbol, timeframe, 100);
      return data.map((d) => d.close);
    } catch (error) {
      console.error("Error preparing wave analysis data:", error);
      return [];
    }
  }

  private analyzeWavePattern(prices: number[]): WavePattern {
    const direction = this.detectTrend(prices);
    const waves = this.findWaves(prices);
    const currentWave = this.determineCurrentWave(waves);

    return {
      points: this.createWavePoints(prices, waves),
      currentWave: currentWave.number,
      subWave: currentWave.subWave,
      confidence: this.calculateConfidence(waves),
      direction,
      targets: this.calculateTargets(prices[prices.length - 1], direction),
    };
  }

  private detectTrend(prices: number[]): "up" | "down" {
    const sma = this.calculateSMA(prices, 20);
    return sma[sma.length - 1] > sma[sma.length - 2] ? "up" : "down";
  }

  private calculateSMA(prices: number[], period: number): number[] {
    const sma = [];
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices
        .slice(i - period + 1, i + 1)
        .reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
    return sma;
  }

  private findWaves(
    prices: number[],
  ): Array<{ start: number; end: number; type: "impulse" | "corrective" }> {
    const waves = [];
    let isImpulse = true;
    let startIdx = 0;

    for (let i = 1; i < prices.length - 1; i++) {
      if (this.isPivot(prices, i)) {
        waves.push({
          start: startIdx,
          end: i,
          type: isImpulse ? "impulse" : "corrective",
        });
        startIdx = i;
        isImpulse = !isImpulse;
      }
    }

    return waves;
  }

  private isPivot(prices: number[], index: number): boolean {
    if (index <= 0 || index >= prices.length - 1) return false;
    return (
      (prices[index] > prices[index - 1] &&
        prices[index] > prices[index + 1]) ||
      (prices[index] < prices[index - 1] && prices[index] < prices[index + 1])
    );
  }

  private determineCurrentWave(waves: Array<{ type: string }>): {
    number: number;
    subWave: string;
  } {
    const currentWaveIndex = waves.length % 5 || 5;
    const subWave = String.fromCharCode(97 + (waves.length % 3));
    return { number: currentWaveIndex, subWave };
  }

  private createWavePoints(prices: number[], waves: any[]): WavePoint[] {
    return waves.map((wave, i) => ({
      price: prices[wave.end],
      time: Date.now() - (waves.length - i) * 60000,
      waveNumber: (i % 5) + 1,
      subWave: String.fromCharCode(97 + (i % 3)),
      confidence: this.calculateConfidence([wave]),
    }));
  }

  private calculateConfidence(waves: any[]): number {
    // Simple confidence calculation based on wave structure
    return Math.min(100, waves.length * 15);
  }

  private calculateTargets(
    currentPrice: number,
    direction: "up" | "down",
  ): Array<{ price: number; probability: number; timeframe: string }> {
    const fibLevels = [1.618, 2.618, 4.236];
    return fibLevels.map((level) => ({
      price: direction === "up" ? currentPrice * level : currentPrice / level,
      probability: 100 / level,
      timeframe: "4h",
    }));
  }

  cleanup() {
    // No cleanup needed for basic implementation
  }
}

export const basicWaveDetector = BasicWaveDetector.getInstance();
