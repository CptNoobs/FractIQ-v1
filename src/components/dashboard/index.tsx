import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Activity, Waves } from "lucide-react";
import { marketData } from "@/lib/market-data";
import { SymbolSearch } from "@/components/ui/symbol-search";
import { WaveChart } from "@/components/ui/wave-chart";
import { ChartControls } from "@/components/analysis/ChartControls";
import WatchlistPanel from "./WatchlistPanel";
import { SignalPanel } from "./SignalPanel";
import { RiskManagementPanel } from "./RiskManagementPanel";
import { ActiveTrades } from "./ActiveTrades";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("4h");
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [marketInfo, setMarketInfo] = useState({
    price: 0,
    change24h: 0,
    volume24h: 0,
    high24h: 0,
    low24h: 0,
  });

  useEffect(() => {
    marketData.enable();

    const handler = (data: any) => {
      setMarketInfo({
        price: data.price,
        change24h: data.priceChangePercent,
        volume24h: data.volume,
        high24h: data.high,
        low24h: data.low,
      });
    };

    marketData.subscribe(selectedSymbol, handler);

    return () => {
      marketData.unsubscribe(selectedSymbol, handler);
    };
  }, [selectedSymbol]);

  return (
    <div className="min-h-screen bg-background p-4 space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/20 via-primary/10 to-background border-0 hover-scale">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-medium">AI Signals</span>
          </div>
          <div className="text-2xl font-bold">5 Active</div>
          <div className="text-sm text-muted-foreground">92% Accuracy</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-0">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-green-500" />
            <span className="font-medium">Performance</span>
          </div>
          <div className="text-2xl font-bold text-green-500">+24.5%</div>
          <div className="text-sm text-muted-foreground">Monthly Return</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background border-0">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="font-medium">Win Rate</span>
          </div>
          <div className="text-2xl font-bold text-blue-500">85%</div>
          <div className="text-sm text-muted-foreground">Last 30 Days</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-background border-0">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-5 w-5 text-purple-500" />
            <span className="font-medium">Active Trades</span>
          </div>
          <div className="text-2xl font-bold text-purple-500">3</div>
          <div className="text-sm text-muted-foreground">
            $12.5K Total Value
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel - Market Overview */}
        <div className="col-span-3 space-y-4">
          <Card className="p-4">
            <SymbolSearch value={selectedSymbol} onSelect={setSelectedSymbol} />
          </Card>
          <WatchlistPanel />
        </div>

        {/* Center Panel - Chart */}
        <div className="col-span-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Chart</h2>
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1H</SelectItem>
                    <SelectItem value="4h">4H</SelectItem>
                    <SelectItem value="1d">1D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ChartControls />
            </div>
            <div className="h-[600px]">
              <WaveChart
                symbol={selectedSymbol}
                timeframe={selectedTimeframe}
                height={600}
                showSignals
              />
            </div>
          </Card>
        </div>

        {/* Right Panel - Trading */}
        <div className="col-span-3 space-y-4">
          <SignalPanel />
          <RiskManagementPanel />
          <ActiveTrades />
        </div>
      </div>
    </div>
  );
}
