import { useEffect, useRef } from "react";
import { createChart, IChartApi } from "lightweight-charts";
import { useTheme } from "@/components/theme-provider";

interface PriceChartProps {
  symbol: string;
  height?: number;
  showVolume?: boolean;
  showGrid?: boolean;
  onChartReady?: (chart: IChartApi) => void;
}

export function PriceChart({
  symbol,
  height = 400,
  showVolume = true,
  showGrid = true,
  onChartReady,
}: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { color: "transparent" },
        textColor: theme === "dark" ? "#E0E0E0" : "#333333",
      },
      grid: {
        vertLines: {
          color: theme === "dark" ? "#333" : "#eee",
          visible: showGrid,
        },
        horzLines: {
          color: theme === "dark" ? "#333" : "#eee",
          visible: showGrid,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: "#26a69a50",
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });
    }

    // Handle window resizing
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    if (onChartReady) {
      onChartReady(chart);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [theme, height, showVolume, showGrid, onChartReady]);

  return <div ref={chartContainerRef} className="w-full" />;
}
