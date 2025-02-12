import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import WavePatternDisplay from "./WavePatternDisplay";

interface MarketAnalysisProps {
  timeframe?: "1H" | "4H" | "1D" | "1W";
  lastUpdated?: string;
  isLoading?: boolean;
}

const MarketAnalysisPanel = ({
  timeframe = "4H",
  lastUpdated = new Date().toLocaleString(),
  isLoading = false,
}: MarketAnalysisProps) => {
  return (
    <Card className="p-6 bg-background w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Market Analysis</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={isLoading}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={isLoading}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={isLoading}
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
            <WavePatternDisplay
              currentWave={3}
              subWave="b"
              trendDirection="up"
              confidence={85}
            />
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
