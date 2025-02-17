import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Waves,
  LineChart,
  BarChart2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  BookOpen,
  Zap,
} from "lucide-react";
import { BTCAnalysis } from "./BTCAnalysis";
import { TechnicalIndicators } from "./TechnicalIndicators";
import { WavePatternAnalysis } from "./WavePatternAnalysis";

export default function Analysis() {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-r from-primary/20 via-primary/10 to-background border-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Market Analysis</h1>
              <p className="text-muted-foreground">
                AI-powered pattern detection and market analysis
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <Brain className="h-3 w-3 mr-1" /> AI Active
              </Badge>
              <Badge className="bg-green-500/20 text-green-500">
                92% Accuracy
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Pattern Detection",
            value: "Wave 3",
            subtext: "Impulse Pattern",
            icon: <Brain className="h-5 w-5 text-primary" />,
            color: "from-primary/20",
          },
          {
            title: "Signal Strength",
            value: "Strong Buy",
            subtext: "Multiple timeframes aligned",
            icon: <Target className="h-5 w-5 text-green-500" />,
            color: "from-green-500/20",
          },
          {
            title: "Market Momentum",
            value: "Bullish",
            subtext: "Increasing volume",
            icon: <Activity className="h-5 w-5 text-blue-500" />,
            color: "from-blue-500/20",
          },
          {
            title: "Risk Level",
            value: "Medium",
            subtext: "Volatility: 2.5%",
            icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
            color: "from-yellow-500/20",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={`p-4 bg-gradient-to-br ${stat.color} via-transparent to-background border-0`}
            >
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

      {/* Main Analysis */}
      <Tabs defaultValue="technical" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="h-9">
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Wave Patterns</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <BookOpen className="h-4 w-4" /> Documentation
            </Button>
            <Button size="sm" className="gap-2">
              <Zap className="h-4 w-4" /> Auto-Trade
            </Button>
          </div>
        </div>

        <TabsContent value="technical" className="mt-0 space-y-6">
          <BTCAnalysis />
          <TechnicalIndicators />
          <WavePatternAnalysis />
        </TabsContent>

        <TabsContent value="ai" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Pattern Analysis */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">AI Pattern Analysis</h3>
                </div>
                <Badge variant="outline">Live</Badge>
              </div>
              {/* Add AI Pattern Analysis Content */}
            </Card>

            {/* Market Sentiment */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Market Sentiment</h3>
                </div>
                <Badge variant="outline">Real-time</Badge>
              </div>
              {/* Add Market Sentiment Content */}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="mt-0">
          {/* Wave Pattern Analysis */}
        </TabsContent>

        <TabsContent value="education" className="mt-0">
          {/* Educational Content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
