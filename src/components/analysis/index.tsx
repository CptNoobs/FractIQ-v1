import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loading } from "@/components/ui/loading";
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
  Brain,
  Target,
} from "lucide-react";
import { WaveChart } from "@/components/ui/wave-chart";
import { TradingViewChart } from "./TradingViewChart";
import { WaveAnalysisPanel } from "./WaveAnalysisPanel";
import { ChartControls } from "./ChartControls";
import { marketData } from "@/lib/market-data";
import { notifications } from "@/lib/notifications";
import { basicWaveDetector } from "@/lib/wave-analysis/basic-wave-detector";

interface MarketInfo {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  openInterest?: number;
  fundingRate?: number;
}

export default function Analysis() {
  const [chartType, setChartType] = useState<"candlestick" | "line" | "area">(
    "candlestick",
  );
  const [showVolume, setShowVolume] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showAI, setShowAI] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [marketInfo, setMarketInfo] = useState<MarketInfo>({
    symbol: "BTCUSDT",
    price: 0,
    change24h: 0,
    volume24h: 0,
    high24h: 0,
    low24h: 0,
  });
  const [wavePattern, setWavePattern] = useState<any>(null);

  const handleMarketData = useCallback((data: any) => {
    setMarketInfo((prev) => ({
      ...prev,
      price: data.price,
      change24h: data.priceChangePercent,
      volume24h: data.volume,
      high24h: data.high,
      low24h: data.low,
    }));
  }, []);

  const handleSymbolChange = (newSymbol: string) => {
    if (!newSymbol || newSymbol === symbol) return;
    setSymbol(newSymbol.toUpperCase());
  };

  const updateWavePattern = async () => {
    try {
      const pattern = await basicWaveDetector.detectWavePattern(symbol);
      setWavePattern(pattern);

      if (pattern.confidence > 80) {
        notifications.notifyPatternDetected(
          `Wave ${pattern.currentWave}${pattern.subWave}`,
          symbol,
          pattern.confidence,
        );
      }
    } catch (error) {
      console.error("Wave pattern detection error:", error);
    }
  };

  useEffect(() => {
    marketData.enable();
    marketData.subscribe(symbol, handleMarketData);
    updateWavePattern();

    const interval = setInterval(updateWavePattern, 60000); // Update every minute

    return () => {
      marketData.unsubscribe(symbol, handleMarketData);
      clearInterval(interval);
    };
  }, [symbol, handleMarketData]);

  if (error) {
    return (
      <div className="p-4 text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="h-16 border-b bg-card px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-[180px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search symbol..."
              value={symbol}
              onChange={(e) => handleSymbolChange(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={marketInfo.change24h >= 0 ? "default" : "destructive"}
              className="text-xs"
            >
              {marketInfo.change24h >= 0 ? "+" : ""}
              {marketInfo.change24h.toFixed(2)}%
            </Badge>
            <span className="text-lg font-mono">
              ${marketInfo.price.toLocaleString()}
            </span>
          </div>
        </div>

        <ChartControls
          chartType={chartType}
          showVolume={showVolume}
          showGrid={showGrid}
          showAI={showAI}
          onChartTypeChange={setChartType}
          onToggleVolume={() => setShowVolume(!showVolume)}
          onToggleGrid={() => setShowGrid(!showGrid)}
          onToggleAI={() => setShowAI(!showAI)}
          onSave={() => {}}
          onShare={() => {}}
          onMaximize={() => {}}
        />
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="h-full p-4 space-y-4 bg-card">
            <Card className="p-4">
              <Tabs defaultValue="technical">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="wave">Wave</TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-280px)] mt-4">
                  <TabsContent value="technical" className="space-y-4">
                    {/* Technical Analysis Content */}
                  </TabsContent>

                  <TabsContent value="wave" className="space-y-4">
                    {wavePattern && <WaveAnalysisPanel data={wavePattern} />}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </Card>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={80}>
          <div className="h-full bg-card">
            <TradingViewChart
              symbol={symbol}
              chartType={chartType}
              showVolume={showVolume}
              showGrid={showGrid}
              showAI={showAI}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
