import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { PriceChart } from "@/components/ui/price-chart";
import { WaveChart } from "@/components/ui/wave-chart";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Waves,
  DollarSign,
  Clock,
  AlertTriangle,
  BarChart2,
  LineChart,
  Sparkles,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { marketData } from "@/lib/market-data";
import { notifications } from "@/lib/notifications";

const mockChartData = [
  { time: "2024-01-01", open: 45000, high: 46000, low: 44800, close: 45800 },
  { time: "2024-01-02", open: 45800, high: 47000, low: 45600, close: 46500 },
];

export default function Home() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Trading Dashboard",
      description: "View your active trades and market analysis",
      icon: <LayoutDashboard className="h-6 w-6" />,
      link: "/dashboard",
      color: "bg-blue-500/20 text-blue-500",
    },
    {
      title: "Market Analysis",
      description: "Deep dive into market patterns",
      icon: <LineChart className="h-6 w-6" />,
      link: "/analysis",
      color: "bg-green-500/20 text-green-500",
    },
    {
      title: "AI Insights",
      description: "ML-powered trading recommendations",
      icon: <Brain className="h-6 w-6" />,
      link: "/insights",
      color: "bg-purple-500/20 text-purple-500",
    },
    {
      title: "Learning Center",
      description: "Elliott Wave theory education",
      icon: <GraduationCap className="h-6 w-6" />,
      link: "/learn",
      color: "bg-orange-500/20 text-orange-500",
    },
  ];

  const recentSignals = [
    {
      pair: "BTC/USD",
      type: "buy",
      confidence: 92,
      timestamp: "2h ago",
    },
    {
      pair: "ETH/USD",
      type: "sell",
      confidence: 88,
      timestamp: "4h ago",
    },
  ];
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1512px] mx-auto space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-primary/20 via-primary/10 to-background border-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="font-medium">AI Signals</span>
            </div>
            <div className="text-2xl font-bold">5 Active</div>
            <div className="text-sm text-muted-foreground">92% Accuracy</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-0">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-green-500" />
              <span className="font-medium">Performance</span>
            </div>
            <div className="text-2xl font-bold text-green-500">+24.5%</div>
            <div className="text-sm text-muted-foreground">Monthly Return</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background border-0">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">85%</div>
            <div className="text-sm text-muted-foreground">Last 30 Days</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-background border-0">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Active Trades</span>
            </div>
            <div className="text-2xl font-bold text-purple-500">3</div>
            <div className="text-sm text-muted-foreground">
              $12.5K Total Value
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[800px] rounded-lg border"
        >
          {/* Market Overview */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Markets</h3>
                <Badge variant="outline">Live</Badge>
              </div>
              <ScrollArea className="h-[calc(100vh-280px)]">
                <div className="space-y-2">
                  {[
                    { symbol: "BTCUSDT", price: 45250, change: 2.5 },
                    { symbol: "ETHUSDT", price: 2350, change: -1.2 },
                    { symbol: "SOLUSDT", price: 98.5, change: 5.7 },
                  ].map((item) => (
                    <button
                      key={item.symbol}
                      onClick={() => setSelectedSymbol(item.symbol)}
                      className={`w-full p-3 rounded-lg hover:bg-muted/50 transition-colors ${selectedSymbol === item.symbol ? "bg-muted/50" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.symbol}</span>
                        <Badge
                          variant={item.change >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {item.change >= 0 ? "+" : ""}
                          {item.change}%
                        </Badge>
                      </div>
                      <div className="text-xl font-mono">
                        ${item.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Chart and Analysis */}
          <ResizablePanel defaultSize={55}>
            <div className="h-full p-4 bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{selectedSymbol}</h2>
                  <Badge variant="outline" className="text-sm">
                    Wave 3
                  </Badge>
                  <Badge variant="default" className="text-sm">
                    Strong Buy
                  </Badge>
                </div>
                <Link to="/analysis">
                  <Button variant="outline" size="sm" className="gap-2">
                    Full Analysis <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="h-[500px] rounded-lg bg-card">
                <WaveChart
                  symbol={selectedSymbol}
                  timeframe="4h"
                  height={500}
                  showSignals={true}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <Card className="p-4 bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">
                    Wave Pattern
                  </div>
                  <div className="font-medium">Impulse Wave</div>
                  <Progress value={85} className="mt-2" />
                </Card>
                <Card className="p-4 bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">
                    AI Confidence
                  </div>
                  <div className="font-medium">92%</div>
                  <Progress value={92} className="mt-2" />
                </Card>
                <Card className="p-4 bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">
                    Signal Strength
                  </div>
                  <div className="font-medium text-green-500">Strong Buy</div>
                  <Progress value={95} className="mt-2" />
                </Card>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Signals and Trading Panel */}
          <ResizablePanel defaultSize={25}>
            <div className="h-full p-4 bg-card">
              <div className="space-y-6">
                {/* AI Signals */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">AI Signals</h3>
                    <Link to="/insights">
                      <Button variant="outline" size="sm" className="gap-2">
                        View All <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[
                      { symbol: "BTCUSDT", type: "BUY", confidence: 92 },
                      { symbol: "ETHUSDT", type: "SELL", confidence: 85 },
                    ].map((signal) => (
                      <Card key={signal.symbol} className="p-3 bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{signal.symbol}</span>
                          <Badge
                            variant={
                              signal.type === "BUY" ? "default" : "destructive"
                            }
                          >
                            {signal.type}
                          </Badge>
                        </div>
                        <Progress value={signal.confidence} />
                        <div className="text-xs text-muted-foreground mt-1">
                          {signal.confidence}% Confidence
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Active Positions */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Active Positions</h3>
                    <Link to="/journal">
                      <Button variant="outline" size="sm" className="gap-2">
                        Journal <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        symbol: "BTCUSDT",
                        type: "LONG",
                        pnl: 2.5,
                        entry: 44000,
                      },
                      {
                        symbol: "ETHUSDT",
                        type: "SHORT",
                        pnl: -1.2,
                        entry: 2400,
                      },
                    ].map((position) => (
                      <Card key={position.symbol} className="p-3 bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {position.type === "LONG" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span>{position.symbol}</span>
                          </div>
                          <Badge
                            variant={
                              position.pnl >= 0 ? "default" : "destructive"
                            }
                          >
                            {position.pnl >= 0 ? "+" : ""}
                            {position.pnl}%
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Entry: ${position.entry.toLocaleString()}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
