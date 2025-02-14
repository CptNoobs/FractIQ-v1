import { useState, useEffect } from "react";
import { marketData } from "@/lib/market-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerData {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
}

export function BinancePublicData() {
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");

  useEffect(() => {
    const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "NEOUSDT"];
    const handleMarketData = (data: any) => {
      setTickers((prev) => {
        const index = prev.findIndex((t) => t.symbol === data.symbol);
        const newTicker = {
          symbol: data.symbol,
          price: data.price.toFixed(2),
          priceChange: data.priceChange.toFixed(2),
          priceChangePercent: data.priceChangePercent.toFixed(2),
        };

        if (index === -1) {
          return [...prev, newTicker];
        }

        const newTickers = [...prev];
        newTickers[index] = newTicker;
        return newTickers;
      });
    };

    // Subscribe to market data
    symbols.forEach((symbol) => {
      marketData.subscribe(symbol, handleMarketData);
    });

    // Connect to WebSocket
    marketData.connect(symbols);
    setWsStatus("connected");

    return () => {
      symbols.forEach((symbol) => {
        marketData.unsubscribe(symbol, handleMarketData);
      });
    };
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Live Market Data</h2>
        <Badge variant={wsStatus === "connected" ? "default" : "destructive"}>
          {wsStatus === "connected" ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {tickers.map((ticker) => (
            <div
              key={ticker.symbol}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
            >
              <div>
                <div className="font-medium">{ticker.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  ${ticker.price}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {parseFloat(ticker.priceChange) >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={
                      parseFloat(ticker.priceChange) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {ticker.priceChangePercent}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ${Math.abs(parseFloat(ticker.priceChange))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
