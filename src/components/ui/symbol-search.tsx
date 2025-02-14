import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Star, TrendingUp, TrendingDown } from "lucide-react";
import { marketData } from "@/lib/market-data";

interface SymbolSearchProps {
  value: string;
  onSelect: (symbol: string) => void;
  onAddToWatchlist?: (symbol: string) => void;
  watchlist?: Set<string>;
}

const popularSymbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"];

export function SymbolSearch({
  value,
  onSelect,
  onAddToWatchlist,
  watchlist = new Set(),
}: SymbolSearchProps) {
  const [search, setSearch] = useState("");
  const [symbols, setSymbols] = useState(popularSymbols);
  const [marketInfo, setMarketInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    const handlers = new Map();

    symbols.forEach((symbol) => {
      const handler = (data: any) => {
        setMarketInfo((prev) => ({
          ...prev,
          [symbol]: {
            price: data.price,
            change: data.priceChangePercent,
          },
        }));
      };

      handlers.set(symbol, handler);
      marketData.subscribe(symbol, handler);
    });

    return () => {
      symbols.forEach((symbol) => {
        const handler = handlers.get(symbol);
        if (handler) {
          marketData.unsubscribe(symbol, handler);
        }
      });
    };
  }, [symbols]);

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-1">
          {filteredSymbols.map((symbol) => (
            <div
              key={symbol}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
              onClick={() => onSelect(symbol)}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{symbol}</span>
                {marketInfo[symbol] && (
                  <Badge
                    variant={
                      marketInfo[symbol].change >= 0 ? "default" : "destructive"
                    }
                    className="text-xs"
                  >
                    {marketInfo[symbol].change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(marketInfo[symbol].change).toFixed(2)}%
                  </Badge>
                )}
              </div>
              {onAddToWatchlist && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToWatchlist(symbol);
                  }}
                >
                  <Star
                    className={`h-4 w-4 ${watchlist.has(symbol) ? "fill-primary" : ""}`}
                  />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
