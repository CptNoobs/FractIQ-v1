export interface WavePattern {
  type: "impulse" | "corrective";
  startIndex: number;
  endIndex: number;
  subWaves: WavePattern[];
  confidence: number;
  direction: "up" | "down";
}

export interface WaveAnalysis {
  currentWave: number;
  subWave: string;
  pattern: WavePattern;
  confidence: number;
  targets: Array<{
    price: number;
    probability: number;
    timeframe: string;
  }>;
  nextWaveScenarios: Array<{
    pattern: WavePattern;
    probability: number;
  }>;
}
