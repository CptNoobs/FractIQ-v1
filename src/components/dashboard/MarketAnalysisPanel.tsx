import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { PriceChart } from "@/components/ui/price-chart";
import { marketData } from "@/lib/market-data";

interface MarketAnalysisProps {
  symbol?: string;
  timeframe?: "1H" | "4H" | "1D" | "1W";
  lastUpdated?: string;
  isLoading?: boolean;
}

const MarketAnalysisPanel = ({
  symbol = "BTCUSDT",
  timeframe = "4H",
  lastUpdated = new Date().toLocaleString(),
  isLoading = false,
}: MarketAnalysisProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleMarketData = (data: any) => {
      setChartData((prev) => {
        const newData = [...prev];
        const lastCandle = newData[newData.length - 1];

        if (
          lastCandle &&
          lastCandle.time === new Date().toISOString().split("T")[0]
        ) {
          // Update last candle
          lastCandle.close = data.price;
          lastCandle.high = Math.max(lastCandle.high, data.price);
          lastCandle.low = Math.min(lastCandle.low, data.price);
        } else {
          // Add new candle
          newData.push({
            time: new Date().toISOString().split("T")[0],
            open: data.price,
            high: data.price,
            low: data.price,
            close: data.price,
          });
        }
        return newData;
      });
    };

    marketData.subscribe(symbol, handleMarketData);
    return () => marketData.unsubscribe(symbol, handleMarketData);
  }, [symbol]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <Card className="p-6 bg-background w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Market Analysis</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleZoomIn}
            disabled={isLoading}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleZoomOut}
            disabled={isLoading}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={isLoading}
            onClick={() => marketData.enable()}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue={timeframe} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="1H">1H</TabsTrigger>
          <TabsTrigger value="4H">4H</TabsTrigger>
          <TabsTrigger value="1D">1D</TabsTrigger>
          <TabsTrigger value="1W">1W</TabsTrigger>
        </TabsList>

        {["1H", "4H", "1D", "1W"].map((tf) => (
          <TabsContent key={tf} value={tf} className="mt-0">
            <div className="h-[400px] w-full">
              <PriceChart
                data={chartData}
                width={800}
                height={400}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </div>
    </Card>
  );
};

export default MarketAnalysisPanel;
