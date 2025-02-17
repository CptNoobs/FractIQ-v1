import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { useJournal } from "@/hooks/useJournal";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  PieChart,
} from "lucide-react";
import type { JournalStats } from "@/types/journal";

import { LoadingSpinner } from "@/components/ui/loading";

export function TradeAnalytics() {
  const { stats, getStats, loading, error } = useJournal();
  const [timeframe, setTimeframe] = useState("30d");
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >();

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Performance Metrics */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Performance Metrics</h3>
          <div className="flex items-center gap-4">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {timeframe === "custom" && (
              <DatePickerWithRange value={dateRange} onChange={setDateRange} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">
              {stats?.winRate?.toFixed(2) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">
              {stats?.profitFactor?.toFixed(2) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Profit Factor</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">
              {stats?.averageRR?.toFixed(2) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Avg R:R</div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">{stats?.totalTrades || 0}</div>
            <div className="text-sm text-muted-foreground">Total Trades</div>
          </div>
        </div>

        {/* Pattern Performance */}
        <div className="space-y-4">
          <h4 className="font-medium">Pattern Performance</h4>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {stats?.bestPerformingPatterns.map((pattern) => (
                <div
                  key={pattern.pattern}
                  className="p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{pattern.pattern}</span>
                    <Badge variant="outline">{pattern.winRate}% Win Rate</Badge>
                  </div>
                  <Progress value={pattern.winRate} />
                  <div className="text-sm text-muted-foreground mt-1">
                    {pattern.trades} trades
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>

      {/* Psychology Insights */}
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Psychology Insights</h3>
          </div>

          <div className="space-y-4">
            {stats?.psychologyInsights.map((insight) => (
              <div key={insight.aspect} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{insight.aspect}</span>
                  <span>{insight.score}/10</span>
                </div>
                <Progress value={insight.score * 10} />
                <p className="text-xs text-muted-foreground">
                  {insight.improvement}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
