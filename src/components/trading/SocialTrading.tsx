import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Star, TrendingUp, Target, Copy } from "lucide-react";

interface Trader {
  id: string;
  name: string;
  avatar: string;
  winRate: number;
  followers: number;
  roi: number;
  trades: number;
  activeTrades: Array<{
    symbol: string;
    type: "long" | "short";
    entry: number;
    current: number;
    pnl: number;
  }>;
}

export function SocialTrading() {
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);

  const traders: Trader[] = [
    {
      id: "1",
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      winRate: 85,
      followers: 1250,
      roi: 124.5,
      trades: 450,
      activeTrades: [
        {
          symbol: "BTC/USD",
          type: "long",
          entry: 45000,
          current: 46500,
          pnl: 3.33,
        },
      ],
    },
    // Add more traders
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Traders List */}
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Top Traders</h3>
          </div>
          <Badge variant="outline">Live Rankings</Badge>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {traders.map((trader) => (
              <Card
                key={trader.id}
                className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${selectedTrader === trader.id ? "border-primary" : ""}`}
                onClick={() => setSelectedTrader(trader.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={trader.avatar}
                    alt={trader.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trader.name}</span>
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          {trader.winRate}% Win Rate
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Copy className="h-4 w-4" /> Copy
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">ROI</div>
                        <div className="font-medium text-green-500">
                          +{trader.roi}%
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Followers</div>
                        <div className="font-medium">{trader.followers}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Trades</div>
                        <div className="font-medium">{trader.trades}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Active Trades */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Active Trades</h3>
          </div>
        </div>

        {selectedTrader ? (
          <div className="space-y-4">
            {traders
              .find((t) => t.id === selectedTrader)
              ?.activeTrades.map((trade, i) => (
                <Card key={i} className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{trade.symbol}</span>
                    <Badge
                      variant={
                        trade.type === "long" ? "default" : "destructive"
                      }
                    >
                      {trade.type.toUpperCase()}
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

                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">PnL</span>
                      <span
                        className={
                          trade.pnl >= 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {trade.pnl >= 0 ? "+" : ""}
                        {trade.pnl}%
                      </span>
                    </div>
                    <Progress
                      value={Math.abs(trade.pnl) * 2}
                      className="h-1"
                      variant={trade.pnl >= 0 ? "default" : "destructive"}
                    />
                  </div>
                </Card>
              ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Select a trader to view their active trades
          </div>
        )}
      </Card>
    </div>
  );
}
