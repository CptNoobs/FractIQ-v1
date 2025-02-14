import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi } from "lightweight-charts";
import { basicWaveDetector } from "@/lib/wave-analysis/basic-wave-detector";
import { marketData } from "@/lib/market-data";

interface WaveChartProps {
  symbol: string;
  timeframe: string;
  height: number;
  showSignals?: boolean;
  onWaveUpdate?: (pattern: any) => void;
  onSignalGenerated?: (signal: any) => void;
}

export function WaveChart({
  symbol,
  timeframe,
  height,
  showSignals = true,
  onWaveUpdate,
  onSignalGenerated,
}: WaveChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.1)" },
        horzLines: { color: "rgba(255, 255, 255, 0.1)" },
      },
      crosshair: {
        mode: 0,
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    // Add wave markers
    const markersSeries = chart.addLineSeries({
      color: "rgba(74, 222, 128, 1)",
      lineWidth: 2,
      crosshairMarkerVisible: false,
    });

    // Subscribe to market data
    const handleMarketData = async (data: any) => {
      // Update chart with new data
      candlestickSeries.update({
        time: data.timestamp / 1000,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
      });

      // Detect wave patterns
      const pattern = await basicWaveDetector.detectWavePattern(symbol);
      if (onWaveUpdate) {
        onWaveUpdate(pattern);
      }

      // Update wave markers
      const markers = pattern.points.map((point) => ({
        time: point.time / 1000,
        value: point.price,
        color: "rgba(74, 222, 128, 1)",
        shape: "circle",
        text: `Wave ${point.waveNumber}${point.subWave}`,
      }));
      markersSeries.setMarkers(markers);
    };

    marketData.subscribe(symbol, handleMarketData);

    chartRef.current = chart;

    return () => {
      marketData.unsubscribe(symbol, handleMarketData);
      chart.remove();
    };
  }, [symbol, timeframe, height]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
