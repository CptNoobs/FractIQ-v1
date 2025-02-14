import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Trade {
  symbol: string;
  type: "long" | "short";
  entry: number;
  current: number;
  pnl: number;
  time: string;
}

const trades: Trade[] = [
  {
    symbol: "BTC/USD",
    type: "long",
    entry: 45000,
    current: 46500,
    pnl: 3.33,
    time: "2h ago",
  },
  {
    symbol: "ETH/USD",
    type: "short",
    entry: 2800,
    current: 2750,
    pnl: 1.79,
    time: "4h ago",
  },
];

export function ActiveTrades() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Active Trades</h3>
      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {trades.map((trade) => (
            <div
              key={trade.symbol}
              className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {trade.type === "long" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">{trade.symbol}</span>
                </div>
                <Badge
                  variant={trade.pnl >= 0 ? "default" : "destructive"}
                  className="text-xs"
                >
                  {trade.pnl >= 0 ? "+" : ""}
                  {trade.pnl}%
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Entry</div>
                  <div className="font-mono">${trade.entry}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Current</div>
                  <div className="font-mono">${trade.current}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Opened {trade.time}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
