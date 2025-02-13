import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  CrosshairMode,
  ISeriesApi,
} from "lightweight-charts";
import { Loading } from "./loading";

interface PriceChartProps {
  data: Array<{
    time: string | number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
  }>;
  type?: "candlestick" | "line" | "area";
  showVolume?: boolean;
  showGrid?: boolean;
  zoomLevel?: number;
  onZoomChange?: (level: number) => void;
}

export function PriceChart({
  data = [],
  type = "candlestick",
  showVolume = true,
  showGrid = true,
  zoomLevel = 1,
  onZoomChange,
}: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<IChartApi>();
  const mainSeriesRef = useRef<
    ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | ISeriesApi<"Area">
  >();
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram">>();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: "solid", color: "transparent" },
        textColor: "#D1D5DB",
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: { color: showGrid ? "#374151" : "transparent" },
        horzLines: { color: showGrid ? "#374151" : "transparent" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: "#374151",
          style: 2,
        },
        horzLine: {
          width: 1,
          color: "#374151",
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: "#374151",
        scaleMargins: {
          top: 0.1,
          bottom: showVolume ? 0.2 : 0.1,
        },
      },
      timeScale: {
        borderColor: "#374151",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Create main series based on type
    let mainSeries;
    if (type === "candlestick") {
      mainSeries = chart.addCandlestickSeries({
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderVisible: false,
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
      });
    } else if (type === "line") {
      mainSeries = chart.addLineSeries({
        color: "#22c55e",
        lineWidth: 2,
      });
    } else {
      mainSeries = chart.addAreaSeries({
        topColor: "#22c55e50",
        bottomColor: "#22c55e10",
        lineColor: "#22c55e",
        lineWidth: 2,
      });
    }

    // Add volume series if enabled
    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: "#60a5fa50",
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
      });
      volumeSeriesRef.current = volumeSeries;
    }

    chartRef.current = chart;
    mainSeriesRef.current = mainSeries;

    if (data.length > 0) {
      mainSeries.setData(data);
      if (showVolume && volumeSeriesRef.current) {
        volumeSeriesRef.current.setData(
          data.map((d) => ({
            time: d.time,
            value: d.volume || 0,
            color:
              (d as any).close >= (d as any).open ? "#22c55e50" : "#ef444450",
          })),
        );
      }
    }

    // Apply zoom level
    chart.timeScale().applyOptions({
      barSpacing: 12 * zoomLevel,
    });

    setIsLoading(false);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [type, showVolume, showGrid]);

  // Update data
  useEffect(() => {
    if (mainSeriesRef.current && data.length > 0) {
      mainSeriesRef.current.setData(data);
      if (showVolume && volumeSeriesRef.current) {
        volumeSeriesRef.current.setData(
          data.map((d) => ({
            time: d.time,
            value: d.volume || 0,
            color:
              (d as any).close >= (d as any).open ? "#22c55e50" : "#ef444450",
          })),
        );
      }
    }
  }, [data, showVolume]);

  // Update zoom level
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.timeScale().applyOptions({
        barSpacing: 12 * zoomLevel,
      });
    }
  }, [zoomLevel]);

  return (
    <div className="relative w-full h-full bg-card rounded-lg overflow-hidden">
      <div ref={chartContainerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loading />
        </div>
      )}
    </div>
  );
}
