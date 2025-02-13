import { useEffect, useRef } from "react";

export function TradingViewChart({ symbol = "BTCUSDT", theme = "dark" }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: container.current?.id,
          symbol: `BINANCE:${symbol}`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          studies: [
            "MASimple@tv-basicstudies",
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies",
          ],
          width: "100%",
          height: "100%",
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [symbol, theme]);

  return (
    <div id="tradingview_widget" ref={container} className="w-full h-full" />
  );
}
