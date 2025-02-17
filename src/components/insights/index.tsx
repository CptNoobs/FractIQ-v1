import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Coins,
  DollarSign,
  CandlestickChart,
  Zap,
} from "lucide-react";

export default function Insights() {
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD");
  const [selectedMarket, setSelectedMarket] = useState("crypto");

  const markets = [
    { id: "crypto", name: "Crypto", icon: <Coins className="h-4 w-4" /> },
    {
      id: "stocks",
      name: "Stocks",
      icon: <CandlestickChart className="h-4 w-4" />,
    },
    { id: "forex", name: "Forex", icon: <DollarSign className="h-4 w-4" /> },
  ];

  const insights = {
    crypto: [
      {
        symbol: "BTC/USD",
        pattern: "Wave 3 Impulse",
        confidence: 92,
        direction: "up",
        prediction: "Strong continuation likely",
        targets: [48500, 51200, 55000],
        sentiment: "Bullish",
        volume: "Above average",
        timeframe: "4h",
        waveCount: 3,
        subWave: "iii",
        keyLevels: [
          { price: 45000, type: "support", strength: 85 },
          { price: 48500, type: "resistance", strength: 75 },
        ],
      },
      {
        symbol: "ETH/USD",
        pattern: "ABC Correction",
        confidence: 85,
        direction: "down",
        prediction: "Temporary pullback",
        targets: [2750, 2650, 2500],
        sentiment: "Neutral",
        volume: "Average",
        timeframe: "1h",
        waveCount: 2,
        subWave: "b",
        keyLevels: [
          { price: 2600, type: "support", strength: 82 },
          { price: 2800, type: "resistance", strength: 78 },
        ],
      },
    ],
    stocks: [
      {
        symbol: "AAPL",
        pattern: "Wave 5 Completion",
        confidence: 88,
        direction: "up",
        prediction: "Final push before correction",
        targets: [198, 205, 210],
        sentiment: "Bullish",
        volume: "High",
        timeframe: "Daily",
        waveCount: 5,
        subWave: "v",
        keyLevels: [
          { price: 190, type: "support", strength: 88 },
          { price: 198, type: "resistance", strength: 82 },
        ],
      },
    ],
    forex: [
      {
        symbol: "EUR/USD",
        pattern: "Wave 1 Initiation",
        confidence: 87,
        direction: "up",
        prediction: "Start of new impulse wave",
        targets: [1.095, 1.105, 1.115],
        sentiment: "Bullish",
        volume: "Above average",
        timeframe: "4h",
        waveCount: 1,
        subWave: "i",
        keyLevels: [
          { price: 1.09, type: "support", strength: 85 },
          { price: 1.095, type: "resistance", strength: 80 },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "AI Accuracy",
            value: "92%",
            subtext: "Pattern Recognition",
            icon: <Brain className="h-5 w-5 text-primary" />,
          },
          {
            title: "Active Signals",
            value: "8",
            subtext: "Across Markets",
            icon: <Zap className="h-5 w-5 text-green-500" />,
          },
          {
            title: "Wave Success",
            value: "88%",
            subtext: "Last 100 Patterns",
            icon: <Waves className="h-5 w-5 text-blue-500" />,
          },
          {
            title: "Markets Analyzed",
            value: "150+",
            subtext: "Real-time Analysis",
            icon: <Activity className="h-5 w-5 text-purple-500" />,
          },
        ].map((stat, i) => (
          <Card key={stat.title} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.subtext}</div>
          </Card>
        ))}
      </div>

      {/* Market Selection */}
      <Tabs
        defaultValue="crypto"
        className="space-y-6"
        onValueChange={(v) => setSelectedMarket(v)}
      >
        <div className="flex items-center justify-between">
          <TabsList>
            {markets.map((market) => (
              <TabsTrigger key={market.id} value={market.id} className="gap-2">
                {market.icon} {market.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {markets.map((market) => (
          <TabsContent key={market.id} value={market.id} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Asset List */}
              <div className="lg:col-span-4 space-y-4">
                {insights[market.id].map((insight) => (
                  <motion.div
                    key={insight.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedAsset(insight.symbol)}
                  >
                    <Card
                      className={`p-4 cursor-pointer ${selectedAsset === insight.symbol ? "border-primary shadow-lg" : "hover:bg-muted/50"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Waves className="h-5 w-5 text-primary" />
                          <span className="font-medium">{insight.symbol}</span>
                        </div>
                        <Badge
                          variant={
                            insight.direction === "up"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {insight.direction === "up" ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          Wave {insight.waveCount}
                          {insight.subWave}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.prediction}
                      </p>
                      <Progress value={insight.confidence} className="h-1" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>{insight.timeframe} Timeframe</span>
                        <span>{insight.confidence}% Confidence</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Analysis */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-bold">{selectedAsset}</h2>
                      <Badge variant="outline">
                        {insights[market.id][0].pattern}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-500">
                        {insights[market.id][0].sentiment}
                      </Badge>
                    </div>
                  </div>
                  <TradingViewChart symbol={selectedAsset} height={400} />
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wave Analysis */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Wave Analysis</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Pattern",
                          value: insights[market.id][0].pattern,
                        },
                        {
                          label: "Wave Count",
                          value: `Wave ${insights[market.id][0].waveCount}${insights[market.id][0].subWave}`,
                        },
                        {
                          label: "Timeframe",
                          value: insights[market.id][0].timeframe,
                        },
                        {
                          label: "Volume",
                          value: insights[market.id][0].volume,
                        },
                        {
                          label: "Sentiment",
                          value: insights[market.id][0].sentiment,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Key Levels */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Key Levels</h3>
                    </div>
                    <div className="space-y-3">
                      {insights[market.id][0].keyLevels.map((level, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">${level.price}</span>
                            <Badge variant="outline">{level.type}</Badge>
                          </div>
                          <Progress value={level.strength} className="mb-1" />
                          <div className="text-xs text-muted-foreground">
                            {level.strength}% Strength
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
