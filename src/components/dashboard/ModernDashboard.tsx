import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  BookOpen,
  BarChart2,
  ChevronRight,
  Settings,
  Bell,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function ModernDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-[60px] border-b border-white/10 bg-[#1A1A1A]/95 backdrop-blur z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search insights & trades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="font-mono text-sm">35.48</span>
              <span className="text-xs text-white/70">WAVE</span>
            </div>
            <Bell className="h-5 w-5 text-white/70 hover:text-white cursor-pointer" />
            <Settings className="h-5 w-5 text-white/70 hover:text-white cursor-pointer" />
            <User className="h-5 w-5 text-white/70 hover:text-white cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="pt-[80px] px-4 space-y-6">
        {/* AI Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "AI Signals",
              value: "5",
              subtext: "Active signals",
              icon: <Brain className="h-5 w-5 text-emerald-500" />,
            },
            {
              title: "Win Rate",
              value: "85%",
              subtext: "Last 30 days",
              icon: <Target className="h-5 w-5 text-emerald-500" />,
            },
            {
              title: "Auto-Trading",
              value: "Active",
              subtext: "2 positions open",
              icon: <Activity className="h-5 w-5 text-emerald-500" />,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="font-medium">{stat.title}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.subtext}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Access Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "AI Pattern Detection",
              description: "Deep market fractal analysis",
              icon: <Brain className="h-5 w-5" />,
              link: "/analysis",
            },
            {
              title: "Auto Trading",
              description: "Manage AI-executed trades",
              icon: <Activity className="h-5 w-5" />,
              link: "/auto-trade",
            },
            {
              title: "Trade Journal",
              description: "AI-enhanced performance insights",
              icon: <BookOpen className="h-5 w-5" />,
              link: "/journal",
            },
            {
              title: "Market Analytics",
              description: "AI-driven market analysis",
              icon: <BarChart2 className="h-5 w-5" />,
              link: "/analytics",
            },
          ].map((feature, i) => (
            <Link key={feature.title} to={feature.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="h-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-4 h-full bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    {feature.icon}
                    <span className="font-medium">{feature.title}</span>
                  </div>
                  <p className="text-sm text-white/50">{feature.description}</p>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* AI Learning & Insights */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold">AI Learning & Insights</h3>
                </div>
                <Badge variant="outline" className="bg-white/5 border-white/10">
                  Real-time
                </Badge>
              </div>

              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium">Pattern Detected</span>
                </div>
                <p className="text-lg font-medium mb-2">
                  Wave 3 impulse pattern detected on BTC/USD
                </p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="bg-white/5 border-emerald-500/20 text-emerald-500"
                  >
                    92% Confidence
                  </Badge>
                  <span className="text-sm text-white/50">Just now</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-white/5 border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">Pattern Accuracy</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">92%</div>
                  <Progress value={92} className="bg-white/5" />
                </Card>

                <Card className="p-4 bg-white/5 border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">Signal Quality</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">88%</div>
                  <Progress value={88} className="bg-white/5" />
                </Card>

                <Card className="p-4 bg-white/5 border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">AI Learning</span>
                  </div>
                  <div className="text-2xl font-bold mb-2">95%</div>
                  <Progress value={95} className="bg-white/5" />
                </Card>
              </div>
            </Card>
          </motion.div>

          {/* Trade Signals */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold">AI Trade Signals</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/5 border-white/10 hover:bg-white/10"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { symbol: "BTC/USD", type: "BUY", confidence: 92 },
                  { symbol: "ETH/USD", type: "SELL", confidence: 85 },
                  { symbol: "SOL/USD", type: "BUY", confidence: 78 },
                ].map((signal) => (
                  <Card
                    key={signal.symbol}
                    className="p-3 bg-white/5 border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{signal.symbol}</span>
                      <Badge
                        variant={
                          signal.type === "BUY" ? "default" : "destructive"
                        }
                        className={
                          signal.type === "BUY"
                            ? "bg-emerald-500/20 text-emerald-500"
                            : "bg-red-500/20 text-red-500"
                        }
                      >
                        {signal.type}
                      </Badge>
                    </div>
                    <Progress
                      value={signal.confidence}
                      className={`bg-white/5 ${signal.type === "BUY" ? "text-emerald-500" : "text-red-500"}`}
                    />
                    <div className="text-xs text-white/50 mt-1">
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
