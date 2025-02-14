import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react";
import { marketData } from "@/lib/market-data";

interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
  wave: number;
  confidence: number;
}

interface WatchlistPanelProps {
  items?: WatchlistItem[];
}

const defaultItems = [
  { symbol: "BTCUSDT", wave: 3, confidence: 85 },
  { symbol: "ETHUSDT", wave: 2, confidence: 75 },
  { symbol: "BNBUSDT", wave: 4, confidence: 65 },
  { symbol: "SOLUSDT", wave: 1, confidence: 90 },
  { symbol: "ADAUSDT", wave: 5, confidence: 70 },
];

export default function WatchlistPanel() {
  const [items, setItems] = useState<WatchlistItem[]>(defaultItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [liveData, setLiveData] = useState<
    Record<string, { price: number; change: number }>
  >({});
  useEffect(() => {
    const handleMarketData = (data: any) => {
      setLiveData((prev) => ({
        ...prev,
        [data.symbol]: {
          price: data.price,
          change: data.priceChangePercent,
        },
      }));
    };

    // Subscribe to market data for each symbol
    items.forEach((item) => {
      marketData.subscribe(item.symbol, handleMarketData);
    });

    return () => {
      items.forEach((item) => {
        marketData.unsubscribe(item.symbol, handleMarketData);
      });
    };
  }, [items]);

  const filteredItems = items.filter((item) =>
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="p-4 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Watchlist</h2>
        </div>
        <div className="relative w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search symbols..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
            >
              <div>
                <div className="font-semibold">{item.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  Wave {item.wave} • {item.confidence}% Confidence
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono">
                  ${liveData[item.symbol]?.price?.toLocaleString() || "--"}
                </div>
                <div className="flex items-center gap-1">
                  {(liveData[item.symbol]?.change || 0) >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      (liveData[item.symbol]?.change || 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {Math.abs(liveData[item.symbol]?.change || 0).toFixed(2)}%
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
