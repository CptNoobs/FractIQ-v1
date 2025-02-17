import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { TradingViewChart } from "@/components/dashboard/TradingViewChart";
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
  Volume2,
  CandlestickChart,
  Gauge,
} from "lucide-react";

export default function Patterns() {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(
    "wave3",
  );
  const [timeframe, setTimeframe] = useState("4h");

  const patterns = {
    elliott: [
      {
        id: "wave3",
        name: "Wave 3 Impulse",
        confidence: 92,
        direction: "up",
        description: "Strong momentum with volume confirmation",
        technicals: {
          rsi: 68,
          volume: "Above average",
          macd: "Bullish crossover",
          support: 44200,
          resistance: 48500,
        },
        characteristics: [
          "Strong price movement with increasing volume",
          "RSI showing momentum but not overbought",
          "Clear wave structure with Fibonacci alignment",
          "Volume profile showing accumulation",
        ],
        predictions: [
          { price: 48500, probability: 85, timeframe: "4h", wave: "3" },
          { price: 51200, probability: 75, timeframe: "1d", wave: "4" },
          { price: 55000, probability: 65, timeframe: "1w", wave: "5" },
        ],
        warnings: [
          "Watch for potential wave 4 pullback",
          "Monitor volume for continuation",
        ],
      },
      {
        id: "ending_diagonal",
        name: "Ending Diagonal",
        confidence: 88,
        direction: "down",
        description: "Terminal pattern with volume divergence",
        technicals: {
          rsi: 72,
          volume: "Declining",
          macd: "Bearish divergence",
          support: 41500,
          resistance: 43200,
        },
        characteristics: [
          "Wedge-like price structure",
          "Declining volume",
          "RSI showing overbought conditions",
          "MACD bearish divergence",
        ],
        predictions: [
          { price: 41500, probability: 82, timeframe: "4h", wave: "5" },
          { price: 39800, probability: 70, timeframe: "1d", wave: "A" },
        ],
        warnings: ["Pattern near completion", "Prepare for reversal"],
      },
    ],
    classical: [
      {
        id: "bull_flag",
        name: "Bull Flag",
        confidence: 85,
        direction: "up",
        description: "Continuation pattern with volume support",
        technicals: {
          rsi: 58,
          volume: "Decreasing in flag",
          macd: "Above signal line",
          support: 45500,
          resistance: 47200,
        },
        characteristics: [
          "Strong upward move (pole)",
          "Consolidation with lower volume",
          "Price channels parallel",
          "Volume typically decreases in flag",
        ],
        predictions: [
          { price: 47200, probability: 80, timeframe: "4h", target: "1" },
          { price: 48500, probability: 70, timeframe: "1d", target: "2" },
        ],
        warnings: ["Watch for false breakout", "Volume must confirm breakout"],
      },
    ],
  };

  const allPatterns = [...patterns.elliott, ...patterns.classical];
  const selectedPatternData = allPatterns.find((p) => p.id === selectedPattern);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Pattern Analysis</h1>
          <p className="text-muted-foreground">
            AI-powered pattern detection with technical confirmation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            <Activity className="h-3 w-3 mr-1" /> Live Analysis
          </Badge>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-muted rounded-md border px-2 py-1"
          >
            {["5m", "15m", "1h", "4h", "1d"].map((tf) => (
              <option key={tf} value={tf}>
                {tf.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="elliott" className="space-y-6">
        <TabsList>
          <TabsTrigger value="elliott">Elliott Wave</TabsTrigger>
          <TabsTrigger value="classical">Classical</TabsTrigger>
          <TabsTrigger value="harmonics">Harmonics</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pattern List */}
          <div className="lg:col-span-4 space-y-4">
            <ScrollArea className="h-[calc(100vh-250px)]">
              {Object.entries(patterns).map(([category, categoryPatterns]) => (
                <div key={category} className="space-y-4 mb-6">
                  {categoryPatterns.map((pattern) => (
                    <motion.div
                      key={pattern.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      <Card
                        className={`p-4 cursor-pointer ${selectedPattern === pattern.id ? "border-primary shadow-lg" : "hover:bg-muted/50"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Waves className="h-5 w-5 text-primary" />
                            <span className="font-medium">{pattern.name}</span>
                          </div>
                          <Badge
                            variant={
                              pattern.direction === "up"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {pattern.direction === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {pattern.confidence}%
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {pattern.description}
                        </p>
                        <Progress value={pattern.confidence} className="h-1" />
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Pattern Analysis */}
          <div className="lg:col-span-8 space-y-6">
            {selectedPatternData ? (
              <>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-bold">
                        {selectedPatternData.name}
                      </h2>
                      <Badge variant="outline">{timeframe.toUpperCase()}</Badge>
                      <Badge
                        className={
                          selectedPatternData.direction === "up"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }
                      >
                        {selectedPatternData.direction === "up"
                          ? "Bullish"
                          : "Bearish"}
                      </Badge>
                    </div>
                  </div>
                  <TradingViewChart height={400} />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Technical Analysis */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Technical Analysis</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Gauge className="h-4 w-4 text-primary" />
                            <span className="text-sm">RSI</span>
                          </div>
                          <div className="text-lg font-semibold">
                            {selectedPatternData.technicals.rsi}
                          </div>
                          <Progress
                            value={selectedPatternData.technicals.rsi}
                          />
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Volume2 className="h-4 w-4 text-primary" />
                            <span className="text-sm">Volume</span>
                          </div>
                          <div className="text-lg font-semibold">
                            {selectedPatternData.technicals.volume}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CandlestickChart className="h-4 w-4 text-primary" />
                          <span className="text-sm">Key Levels</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Support
                            </div>
                            <div className="font-semibold">
                              ${selectedPatternData.technicals.support}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Resistance
                            </div>
                            <div className="font-semibold">
                              ${selectedPatternData.technicals.resistance}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {selectedPatternData.characteristics.map((char, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Target className="h-4 w-4 text-primary" />
                            <span>{char}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Predictions & Warnings */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Predictions & Risks</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedPatternData.predictions.map((pred, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">${pred.price}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{pred.timeframe}</Badge>
                              <Badge variant="secondary">{`Wave ${pred.wave || pred.target}`}</Badge>
                            </div>
                          </div>
                          <Progress value={pred.probability} className="mb-1" />
                          <div className="text-xs text-muted-foreground">
                            {pred.probability}% probability
                          </div>
                        </div>
                      ))}

                      <div className="space-y-2 mt-4">
                        <h4 className="font-medium mb-2">Risk Warnings</h4>
                        {selectedPatternData.warnings.map((warning, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-yellow-500"
                          >
                            <AlertTriangle className="h-4 w-4" />
                            <span>{warning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Waves className="h-12 w-12 mb-4 mx-auto" />
                  <p>Select a pattern to view detailed analysis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
