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
  pattern: string;
  targets: Array<{
    price: number;
    probability: number;
    timeframe: string;
  }>;
}

export interface WaveRule {
  name: string;
  validate: (points: WavePoint[]) => boolean;
  description: string;
}

export interface WaveDetector {
  detectWavePattern(symbol: string, timeframe?: string): Promise<WavePattern>;
  cleanup(): void;
}
