import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Search,
  ScanSearch,
  TrendingUp,
  TrendingDown,
  Brain,
  Waves,
  Filter,
  RefreshCw,
} from "lucide-react";

interface ScanResult {
  symbol: string;
  pattern: string;
  confidence: number;
  direction: "up" | "down";
  timeframe: string;
  volume: string;
  rsi: number;
  wave: number;
  subWave: string;
}

export function MarketScanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("4h");
  const [loading, setLoading] = useState(false);

  // Mock scan results - replace with real data
  const scanResults: ScanResult[] = [
    {
      symbol: "BTC/USD",
      pattern: "Wave 3 Impulse",
      confidence: 92,
      direction: "up",
      timeframe: "4h",
      volume: "Above Average",
      rsi: 65,
      wave: 3,
      subWave: "iii",
    },
    {
      symbol: "ETH/USD",
      pattern: "Ending Diagonal",
      confidence: 88,
      direction: "down",
      timeframe: "4h",
      volume: "High",
      rsi: 72,
      wave: 5,
      subWave: "v",
    },
  ];

  const filteredResults = scanResults.filter(
    (result) =>
      result.symbol.toLowerCase().includes(searchQuery.toLowerCase()) &&
      result.timeframe === selectedTimeframe,
  );

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ScanSearch className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Market Scanner</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{selectedTimeframe} Timeframe</Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="p-2 rounded-md border bg-background"
        >
          {["5m", "15m", "1h", "4h", "1d"].map((tf) => (
            <option key={tf} value={tf}>
              {tf.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card
              key={result.symbol}
              className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {result.direction === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">{result.symbol}</span>
                </div>
                <Badge
                  variant={
                    result.direction === "up" ? "default" : "destructive"
                  }
                >
                  {result.confidence}% Confidence
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <div className="text-sm text-muted-foreground">Pattern</div>
                  <div className="font-medium">{result.pattern}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Wave</div>
                  <div className="font-medium">
                    {result.wave}
                    {result.subWave}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">RSI</span>
                    <span>{result.rsi}</span>
                  </div>
                  <Progress
                    value={result.rsi}
                    className="h-1"
                    variant={
                      result.rsi > 70 || result.rsi < 30
                        ? "destructive"
                        : "default"
                    }
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Volume</span>
                  <span>{result.volume}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
