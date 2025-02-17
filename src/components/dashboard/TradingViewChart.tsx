import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useTheme } from "@/components/theme-provider";
import { wsManager } from "@/lib/websocket";

export function TradingViewChart({
  symbol = "BTCUSDT",
  height = 400,
  showVolume = true,
  showGrid = true,
  onChartReady,
}: {
  symbol?: string;
  height?: number;
  showVolume?: boolean;
  showGrid?: boolean;
  onChartReady?: (chart: any) => void;
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      height,
      layout: {
        background: { color: theme === "dark" ? "#1a1a1a" : "#ffffff" },
        textColor: theme === "dark" ? "#d1d5db" : "#374151",
      },
      grid: {
        vertLines: { color: showGrid ? "#2c2c2c" : "transparent" },
        horzLines: { color: showGrid ? "#2c2c2c" : "transparent" },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: "#64748b",
        priceFormat: { type: "volume" },
        priceScaleId: "",
      });
    }

    // Subscribe to market data updates
    wsManager.subscribe("market_data", (data) => {
      if (data.symbol === symbol) {
        candlestickSeries.update({
          time: data.time,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
        });
      }
    });

    // Initial mock data
    const data = Array.from({ length: 100 }, (_, i) => ({
      time: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      open: 45000 + Math.random() * 1000,
      high: 45000 + Math.random() * 2000,
      low: 45000 - Math.random() * 1000,
      close: 45000 + Math.random() * 1000,
    }));

    candlestickSeries.setData(data);

    if (onChartReady) {
      onChartReady(chart);
    }

    return () => {
      chart.remove();
    };
  }, [height, showVolume, showGrid, theme]);

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm gradient-border card-float">
      <div ref={chartContainerRef} />
    </div>
  );
}
