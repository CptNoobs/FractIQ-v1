import { useEffect, useRef, useState } from "react";
import { marketWebSocket } from "@/lib/market-data/websocket";

interface Props {
  symbol?: string;
  theme?: "dark" | "light";
  interval?: string;
  studies?: string[];
}

function TradingViewChartComponent({
  symbol = "BTCUSDT",
  theme = "dark",
  interval = "D",
  studies = [
    "MASimple@tv-basicstudies",
    "RSI@tv-basicstudies",
    "MACD@tv-basicstudies",
  ],
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [lastPrice, setLastPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!container.current) return;

    // Initialize TradingView widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: container.current?.id,
          symbol: `BINANCE:${symbol}`,
          interval: interval,
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          studies: studies,
          width: "100%",
          height: "100%",
          save_image: false,
          hide_volume: false,
          auto_save_delay: 5,
        });
      }
    };
    document.head.appendChild(script);

    // Subscribe to real-time market data
    const handleMarketData = (data: any) => {
      const price = parseFloat(data.p || data.price);
      setLastPrice(price);

      // Update chart if needed
      if (window.TradingView && container.current) {
        // The widget automatically updates with real-time data from Binance
        // We just need to handle any additional UI updates
      }
    };

    marketWebSocket.connect(symbol, handleMarketData);

    return () => {
      marketWebSocket.disconnect(symbol, handleMarketData);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, theme, interval, studies]);

  return (
    <div className="relative w-full h-full">
      <div id="tradingview_widget" ref={container} className="w-full h-full" />
      {lastPrice && (
        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border shadow-sm">
          <span className="text-sm font-medium">
            ${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </div>
  );
}

export const TradingViewChart = TradingViewChartComponent;
