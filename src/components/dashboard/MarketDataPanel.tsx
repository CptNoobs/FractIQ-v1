import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Waves } from "lucide-react";
import { marketData } from "@/lib/market-data";

interface MarketDataItem {
  symbol: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  high: number;
  low: number;
}

export function MarketDataPanel() {
  const [data, setData] = useState<MarketDataItem[]>([]);
  const [wsStatus, setWsStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("disconnected");

  useEffect(() => {
    const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"];

    const handleMarketData = (data: MarketDataItem) => {
      setData((prev) => {
        const index = prev.findIndex((item) => item.symbol === data.symbol);
        if (index === -1) return [...prev, data];
        const newData = [...prev];
        newData[index] = data;
        return newData;
      });
    };

    symbols.forEach((symbol) => marketData.subscribe(symbol, handleMarketData));
    marketData.connect(symbols);
    setWsStatus("connected");

    return () => {
      symbols.forEach((symbol) =>
        marketData.unsubscribe(symbol, handleMarketData),
      );
      marketData.disconnect();
    };
  }, []);

  return (
    <Card className="p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Live Market Data</h2>
        </div>
        <Badge variant={wsStatus === "connected" ? "default" : "destructive"}>
          {wsStatus === "connected" ? "Live" : "Disconnected"}
        </Badge>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
            >
              <div>
                <div className="font-medium">{item.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  Vol: {item.volume.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono">${item.price.toLocaleString()}</div>
                <div className="flex items-center gap-1">
                  {item.priceChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      item.priceChange >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {item.priceChangePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
