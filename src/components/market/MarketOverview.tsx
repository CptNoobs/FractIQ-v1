import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SymbolSearch } from "@/components/ui/symbol-search";
import { PriceChart } from "@/components/ui/price-chart";
import { marketData } from "@/lib/market-data";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

export function MarketOverview() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [marketInfo, setMarketInfo] = useState<MarketData | null>(null);

  useEffect(() => {
    if (!selectedSymbol) return;

    const handleMarketData = (data: any) => {
      setMarketInfo({
        symbol: data.symbol,
        price: data.price,
        change24h: data.priceChangePercent,
        volume24h: data.volume,
        high24h: data.high,
        low24h: data.low,
      });
    };

    // Enable market data service if not already enabled
    marketData.enable();

    // Subscribe to market data
    marketData.subscribe(selectedSymbol, handleMarketData);

    return () => {
      if (selectedSymbol) {
        marketData.unsubscribe(selectedSymbol, handleMarketData);
      }
    };
  }, [selectedSymbol]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 col-span-1">
          <SymbolSearch value={selectedSymbol} onSelect={setSelectedSymbol} />
        </Card>

        {marketInfo && (
          <Card className="p-4 col-span-3">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="text-2xl font-mono">
                  ${marketInfo.price.toLocaleString()}
                </div>
                <Badge
                  variant={
                    marketInfo.change24h >= 0 ? "default" : "destructive"
                  }
                  className="mt-1"
                >
                  {marketInfo.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {marketInfo.change24h.toFixed(2)}%
                </Badge>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
                <div className="text-2xl font-mono">
                  ${(marketInfo.volume24h / 1000000).toFixed(2)}M
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">24h High</div>
                <div className="text-2xl font-mono text-green-500">
                  ${marketInfo.high24h.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">24h Low</div>
                <div className="text-2xl font-mono text-red-500">
                  ${marketInfo.low24h.toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card className="p-4">
        <PriceChart symbol={selectedSymbol} height={500} />
      </Card>
    </div>
  );
}
