import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Activity,
  TrendingUp,
  TrendingDown,
  Waves,
} from "lucide-react";
import { TradingViewChart } from "./TradingViewChart";
import { marketData } from "@/lib/market-data";

const defaultMarketData = {
  symbol: "BTCUSDT",
  price: 45250.75,
  change24h: 2.5,
  volume24h: 1250000000,
  high24h: 46500,
  low24h: 44800,
  openInterest: 980000000,
  fundingRate: 0.0001,
};

const technicalIndicators = [
  { name: "RSI (14)", value: 58, signal: "neutral", range: [0, 100] },
  { name: "MACD", value: "0.0025", signal: "buy" },
  { name: "Stoch RSI", value: 82, signal: "sell", range: [0, 100] },
  { name: "ADX", value: 45, signal: "buy" },
];

const waveAnalysis = {
  current: 3,
  pattern: "Impulse Wave",
  confidence: 85,
  targets: [
    { wave: 3, price: 48500, probability: 75 },
    { wave: 4, price: 46200, probability: 65 },
    { wave: 5, price: 52000, probability: 55 },
  ],
};

export default function Analysis() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [marketInfo, setMarketInfo] = useState(defaultMarketData);

  useEffect(() => {
    const handleMarketData = (data: any) => {
      setMarketInfo((prev) => ({
        ...prev,
        price: data.price,
        change24h: data.priceChangePercent,
        volume24h: data.volume,
        high24h: data.high,
        low24h: data.low,
      }));
    };

    marketData.subscribe(symbol, handleMarketData);
    return () => marketData.unsubscribe(symbol, handleMarketData);
  }, [symbol]);

  return (
    <div className="h-screen bg-background">
      {/* Top Stats Bar */}
      <div className="h-12 border-b bg-card grid grid-cols-7 divide-x">
        {/* Symbol & Price */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">{symbol}</span>
            <span className="text-lg font-mono">
              ${marketInfo.price.toLocaleString()}
            </span>
          </div>
          <Badge
            variant={marketInfo.change24h >= 0 ? "default" : "destructive"}
            className="text-xs"
          >
            {marketInfo.change24h >= 0 ? "+" : ""}
            {marketInfo.change24h}%
          </Badge>
        </div>

        {/* 24h High */}
        <div className="px-4 flex flex-col justify-center">
          <div className="text-sm font-medium text-green-500">
            ${marketInfo.high24h.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">24h High</div>
        </div>

        {/* 24h Low */}
        <div className="px-4 flex flex-col justify-center">
          <div className="text-sm font-medium text-red-500">
            ${marketInfo.low24h.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">24h Low</div>
        </div>

        {/* Volume */}
        <div className="px-4 flex flex-col justify-center">
          <div className="text-sm font-medium">
            ${(marketInfo.volume24h / 1000000).toFixed(2)}M
          </div>
          <div className="text-xs text-muted-foreground">24h Volume</div>
        </div>

        {/* Wave Analysis */}
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-primary" />
            <div>
              <div className="text-sm font-medium">
                Wave {waveAnalysis.current}
              </div>
              <div className="text-xs text-muted-foreground">
                {waveAnalysis.pattern}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {waveAnalysis.confidence}%
          </Badge>
        </div>

        {/* Market Mode */}
        <div className="px-4 flex flex-col justify-center">
          <div className="text-sm font-medium text-green-500">Bullish</div>
          <div className="text-xs text-muted-foreground">Market Mode</div>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel - Analysis Tools */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search symbol..."
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="pl-8"
              />
            </div>

            <Card className="p-4">
              <Tabs defaultValue="technical">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="wave">Wave</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-280px)] mt-4">
                  <TabsContent value="technical" className="space-y-4">
                    {technicalIndicators.map((indicator) => (
                      <div key={indicator.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{indicator.name}</span>
                          </div>
                          <Badge
                            variant={
                              indicator.signal === "buy"
                                ? "default"
                                : indicator.signal === "sell"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {indicator.value}
                          </Badge>
                        </div>
                        {indicator.range && (
                          <div>
                            <Progress
                              value={
                                ((parseFloat(indicator.value.toString()) -
                                  indicator.range[0]) /
                                  (indicator.range[1] - indicator.range[0])) *
                                100
                              }
                            />
                            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                              <span>{indicator.range[0]}</span>
                              <span>{indicator.range[1]}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="wave" className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Waves className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Wave {waveAnalysis.current}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {waveAnalysis.pattern}
                      </div>
                      <div className="mt-2">
                        <Progress value={waveAnalysis.confidence} />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>Pattern Confidence</span>
                          <span>{waveAnalysis.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Wave Targets</h3>
                      {waveAnalysis.targets.map((target) => (
                        <div
                          key={target.wave}
                          className="p-2 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">
                              Wave {target.wave} Target
                            </span>
                            <span className="font-mono text-sm">
                              ${target.price.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={target.probability} />
                          <div className="text-right mt-1 text-xs text-muted-foreground">
                            {target.probability}% probability
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </Card>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Chart Panel */}
        <ResizablePanel defaultSize={80}>
          <div className="h-full">
            <TradingViewChart symbol={symbol} theme="dark" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
