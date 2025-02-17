import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { TradingViewChart } from "@/components/dashboard/TradingViewChart";
import {
  PlayCircle,
  Settings,
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Brain,
  BarChart2,
} from "lucide-react";

interface BacktestResult {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  netProfit: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: Array<{
    id: string;
    type: "buy" | "sell";
    entry: number;
    exit: number;
    pnl: number;
    date: string;
  }>;
}

export function BacktestingModule() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-02-20");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BacktestResult | null>(null);

  const handleBacktest = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        totalTrades: 156,
        winRate: 68.5,
        profitFactor: 2.3,
        netProfit: 12500,
        maxDrawdown: 15.2,
        sharpeRatio: 1.8,
        trades: [
          {
            id: "1",
            type: "buy",
            entry: 45000,
            exit: 47500,
            pnl: 2500,
            date: "2024-02-01",
          },
          {
            id: "2",
            type: "sell",
            entry: 48000,
            exit: 46000,
            pnl: 2000,
            date: "2024-02-05",
          },
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Strategy Backtesting</h2>
          </div>
          <Button onClick={handleBacktest} disabled={loading} className="gap-2">
            {loading ? (
              <BarChart2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlayCircle className="h-4 w-4" />
            )}
            Run Backtest
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-4 w-4 text-primary" />
              <h3 className="font-medium">Test Parameters</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Symbol</Label>
                <Input
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {results && (
            <Card className="p-4 col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Results</h3>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Trades
                  </div>
                  <div className="text-2xl font-bold">
                    {results.totalTrades}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Win Rate
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    {results.winRate}%
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Net Profit
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    ${results.netProfit}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Profit Factor
                  </div>
                  <div className="text-2xl font-bold">
                    {results.profitFactor}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Max Drawdown
                  </div>
                  <div className="text-2xl font-bold text-red-500">
                    {results.maxDrawdown}%
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Sharpe Ratio
                  </div>
                  <div className="text-2xl font-bold">
                    {results.sharpeRatio}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium mb-2">Trade History</h4>
                <ScrollArea className="h-[200px]">
                  {results.trades.map((trade) => (
                    <div
                      key={trade.id}
                      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {trade.type === "buy" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">
                          {trade.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {trade.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Entry:</span>{" "}
                          ${trade.entry}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Exit:</span> $
                          {trade.exit}
                        </div>
                        <Badge
                          variant={trade.pnl >= 0 ? "default" : "destructive"}
                        >
                          {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </Card>
          )}
        </div>
      </Card>

      {/* Chart */}
      <Card className="p-6">
        <TradingViewChart symbol={symbol} height={400} />
      </Card>
    </div>
  );
}
