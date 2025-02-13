class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private thresholds: Map<string, number> = new Map();

  private constructor() {
    // Set default thresholds
    this.thresholds.set("wsLatency", 500); // 500ms
    this.thresholds.set("patternDetection", 100); // 100ms
    this.thresholds.set("renderTime", 16); // 16ms (60fps)
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  measure(metric: string, value: number) {
    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }
    this.metrics.get(metric)?.push(value);

    // Check threshold
    const threshold = this.thresholds.get(metric);
    if (threshold && value > threshold) {
      console.warn(
        `Performance warning: ${metric} exceeded threshold (${value}ms > ${threshold}ms)`,
      );
    }

    // Keep only last 1000 measurements
    const values = this.metrics.get(metric);
    if (values && values.length > 1000) {
      values.shift();
    }
  }

  getMetrics(metric: string) {
    const values = this.metrics.get(metric) || [];
    if (values.length === 0) return null;

    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      p95: this.percentile(values, 95),
      p99: this.percentile(values, 99),
    };
  }

  private percentile(values: number[], p: number) {
    const sorted = [...values].sort((a, b) => a - b);
    const pos = ((sorted.length - 1) * p) / 100;
    const base = Math.floor(pos);
    const rest = pos - base;

    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
      return sorted[base];
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
