import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react";

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

const defaultItems: WatchlistItem[] = [
  { symbol: "BTC/USD", price: 45250.75, change: 2.5, wave: 3, confidence: 85 },
  { symbol: "ETH/USD", price: 2250.5, change: -1.2, wave: 2, confidence: 75 },
  { symbol: "XRP/USD", price: 0.55, change: 1.8, wave: 4, confidence: 65 },
  { symbol: "SOL/USD", price: 125.75, change: 5.2, wave: 1, confidence: 90 },
  { symbol: "ADA/USD", price: 0.85, change: -0.5, wave: 5, confidence: 70 },
];

export default function WatchlistPanel({
  items = defaultItems,
}: WatchlistPanelProps) {
  return (
    <Card className="p-4 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Watchlist</h2>
        </div>
        <div className="relative w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search symbols..." className="pl-8" />
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {items.map((item) => (
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
                <div className="font-mono">${item.price.toLocaleString()}</div>
                <div className="flex items-center gap-1">
                  {item.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      item.change >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {Math.abs(item.change)}%
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
