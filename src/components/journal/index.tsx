import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  BookOpen,
  LineChart,
  BarChart2,
  AlertTriangle,
  ChevronRight,
  Plus,
  Calendar,
  Filter,
} from "lucide-react";

export default function Journal() {
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const stats = {
    totalTrades: 156,
    winRate: 72,
    profitFactor: 2.1,
    averageRR: 1.8,
    bestTrade: 1250,
    worstTrade: -450,
  };

  const trades = [
    {
      id: "1",
      symbol: "BTC/USD",
      type: "long",
      entry: 45000,
      exit: 48500,
      pnl: 3500,
      rr: 2.5,
      date: "2024-02-20",
      confidence: 92,
      pattern: "Wave 3 Impulse",
    },
    {
      id: "2",
      symbol: "ETH/USD",
      type: "short",
      entry: 2800,
      exit: 2650,
      pnl: 150,
      rr: 1.5,
      date: "2024-02-19",
      confidence: 85,
      pattern: "ABC Correction",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Trading Journal</h1>
          <p className="text-muted-foreground">Track and analyze your trades</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Trade
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Trades", value: stats.totalTrades, format: "number" },
          { label: "Win Rate", value: stats.winRate, format: "percent" },
          {
            label: "Profit Factor",
            value: stats.profitFactor,
            format: "decimal",
          },
          { label: "Average R:R", value: stats.averageRR, format: "decimal" },
          { label: "Best Trade", value: stats.bestTrade, format: "currency" },
          { label: "Worst Trade", value: stats.worstTrade, format: "currency" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-2xl font-bold">
                {stat.format === "percent" && stat.value >= 0 && "+"}
                {stat.format === "currency" && "$"}
                {stat.format === "decimal" ? stat.value.toFixed(2) : stat.value}
                {stat.format === "percent" && "%"}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="trades" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" /> Date Range
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <TabsContent value="trades" className="space-y-4">
          <Card>
            <ScrollArea className="h-[500px]">
              <div className="p-4 space-y-4">
                {trades.map((trade) => (
                  <motion.div
                    key={trade.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            trade.type === "long" ? "default" : "destructive"
                          }
                          className="w-16 justify-center"
                        >
                          {trade.type.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{trade.symbol}</span>
                      </div>
                      <Badge
                        variant={trade.pnl >= 0 ? "default" : "destructive"}
                        className="font-mono"
                      >
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Entry</div>
                        <div className="font-mono">${trade.entry}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Exit</div>
                        <div className="font-mono">${trade.exit}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">R:R</div>
                        <div className="font-mono">{trade.rr}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Pattern</div>
                        <div className="font-medium">{trade.pattern}</div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Progress value={trade.confidence} />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>AI Confidence</span>
                        <span>{trade.confidence}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Analysis */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Performance Analysis</h3>
              </div>
              {/* Add performance analysis content */}
            </Card>

            {/* Pattern Analysis */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Pattern Analysis</h3>
              </div>
              {/* Add pattern analysis content */}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns">
          {/* Pattern statistics and analysis */}
        </TabsContent>

        <TabsContent value="learning">
          {/* Learning insights and recommendations */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
