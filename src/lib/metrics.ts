import { BehaviorSubject } from "rxjs";
import { eventBus } from "./event-bus";

interface Metric {
  value: number;
  timestamp: number;
  labels: Record<string, string>;
}

class MetricsService {
  private static instance: MetricsService;
  private metrics: Map<string, BehaviorSubject<Metric[]>>;
  private retentionPeriod = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {
    this.metrics = new Map();
    this.initializeMetrics();
  }

  static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  private initializeMetrics() {
    // Initialize default metrics
    this.createMetric("market_latency");
    this.createMetric("wave_detection_confidence");
    this.createMetric("signal_accuracy");
    this.createMetric("model_inference_time");
    this.createMetric("trade_execution_time");

    // Subscribe to events
    eventBus.on("MARKET_UPDATE").subscribe((event) => {
      this.recordLatency("market_latency", event.timestamp);
    });

    eventBus.on("WAVE_DETECTED").subscribe((event) => {
      this.record("wave_detection_confidence", event.payload.confidence, {
        symbol: event.payload.symbol,
      });
    });

    eventBus.on("SIGNAL_GENERATED").subscribe((event) => {
      this.record("signal_accuracy", event.payload.confidence, {
        symbol: event.payload.symbol,
        type: event.payload.type,
      });
    });
  }

  private createMetric(name: string) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, new BehaviorSubject<Metric[]>([]));
    }
  }

  record(name: string, value: number, labels: Record<string, string> = {}) {
    const metric = this.metrics.get(name);
    if (metric) {
      const newMetric: Metric = {
        value,
        timestamp: Date.now(),
        labels,
      };

      const currentMetrics = metric.value;
      const cutoffTime = Date.now() - this.retentionPeriod;
      const filteredMetrics = currentMetrics.filter(
        (m) => m.timestamp > cutoffTime,
      );

      metric.next([...filteredMetrics, newMetric]);
    }
  }

  recordLatency(
    name: string,
    startTime: number,
    labels: Record<string, string> = {},
  ) {
    const latency = Date.now() - startTime;
    this.record(name, latency, labels);
  }

  getMetric(name: string): Metric[] {
    return this.metrics.get(name)?.value || [];
  }

  getAggregatedMetric(
    name: string,
    aggregation: "avg" | "max" | "min" = "avg",
  ): number {
    const metrics = this.getMetric(name);
    if (!metrics.length) return 0;

    const values = metrics.map((m) => m.value);
    switch (aggregation) {
      case "max":
        return Math.max(...values);
      case "min":
        return Math.min(...values);
      default:
        return values.reduce((a, b) => a + b, 0) / values.length;
    }
  }
}

export const metrics = MetricsService.getInstance();
