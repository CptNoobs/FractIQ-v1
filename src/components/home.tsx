import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { TradingViewChart } from "@/components/dashboard/TradingViewChart";
import { motion } from "framer-motion";
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

export default function Home() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - 60px height */}
      <header className="border-b bg-card/50">
        <div className="container mx-auto h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">FractIQ</h1>
            <Badge variant="outline" className="text-sm">
              <Clock className="h-3 w-3 mr-1" /> Live
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Top Stats Grid - 4 equal boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "AI Signals",
              value: "5 Active",
              subtext: "92% Accuracy",
              icon: <Sparkles className="h-5 w-5 text-primary" />,
              color: "from-primary/20 via-primary/10 to-background",
            },
            {
              title: "Performance",
              value: "+24.5%",
              subtext: "Monthly Return",
              icon: <Target className="h-5 w-5 text-green-500" />,
              color: "from-green-500/20 via-green-500/10 to-background",
            },
            {
              title: "Win Rate",
              value: "85%",
              subtext: "Last 30 Days",
              icon: <Activity className="h-5 w-5 text-blue-500" />,
              color: "from-blue-500/20 via-blue-500/10 to-background",
            },
            {
              title: "Active Trades",
              value: "3",
              subtext: "$12.5K Total Value",
              icon: <Zap className="h-5 w-5 text-purple-500" />,
              color: "from-purple-500/20 via-purple-500/10 to-background",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-4 bg-gradient-to-br ${stat.color} border-0`}>
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="font-medium">{stat.title}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.subtext}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid - 65/35 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section - 65% */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{selectedSymbol}</h2>
                  <Badge variant="outline">Wave 3</Badge>
                  <Badge>Strong Buy</Badge>
                </div>
                <Link to="/analysis">
                  <Button variant="outline" size="sm" className="gap-2">
                    Full Analysis <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <TradingViewChart symbol={selectedSymbol} height={500} />
            </Card>
          </motion.div>

          {/* AI Analysis - 35% */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">AI Analysis</h3>
                </div>
                <Badge variant="outline">Live</Badge>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Waves className="h-4 w-4 text-primary" />
                    <span className="font-medium">Wave Pattern</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">Wave 3</div>
                  <div className="text-sm text-muted-foreground">
                    Strong upward momentum
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-muted/50">
                    <div className="text-sm text-muted-foreground mb-1">
                      Pattern
                    </div>
                    <div className="font-medium">Impulse</div>
                    <Progress value={85} className="mt-2" />
                  </Card>
                  <Card className="p-4 bg-muted/50">
                    <div className="text-sm text-muted-foreground mb-1">
                      Confidence
                    </div>
                    <div className="font-medium">92%</div>
                    <Progress value={92} className="mt-2" />
                  </Card>
                  <Card className="p-4 bg-muted/50">
                    <div className="text-sm text-muted-foreground mb-1">
                      Signal
                    </div>
                    <div className="font-medium text-green-500">Buy</div>
                    <Progress value={95} className="mt-2" />
                  </Card>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Live Signals</h3>
                </div>
                <Link to="/signals">
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
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
