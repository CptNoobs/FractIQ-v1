import React from "react";
import MarketAnalysisPanel from "./dashboard/MarketAnalysisPanel";
import SignalPanel from "./dashboard/SignalPanel";
import RiskManagementPanel from "./dashboard/RiskManagementPanel";
import WatchlistPanel from "./dashboard/WatchlistPanel";

import SummaryPanel from "./dashboard/SummaryPanel";

interface HomeProps {
  marketData?: {
    timeframe: "1H" | "4H" | "1D" | "1W";
    lastUpdated: string;
  };
  signalData?: {
    type: "buy" | "sell" | "hold";
    strength: number;
    price: number;
    timestamp: string;
    confidence: number;
  };
  riskData?: {
    stopLoss: number;
    takeProfit: number;
    positionSize: number;
    riskRewardRatio: number;
    confidence: number;
  };
}

const defaultMarketData = {
  timeframe: "4H" as const,
  lastUpdated: new Date().toLocaleString(),
};

const defaultSignalData = {
  type: "buy" as const,
  strength: 8,
  price: 45250.75,
  timestamp: new Date().toISOString(),
  confidence: 85,
};

const defaultRiskData = {
  stopLoss: 44500.25,
  takeProfit: 47000.5,
  positionSize: 1000,
  riskRewardRatio: 2.5,
  confidence: 85,
};

const Home = ({
  marketData = defaultMarketData,
  signalData = defaultSignalData,
  riskData = defaultRiskData,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1512px] mx-auto space-y-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Elliott Wave AI Dashboard</h1>
          <p className="text-muted-foreground">
            ML-powered market analysis and trading signals
          </p>
        </header>

        <SummaryPanel />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <WatchlistPanel />
          </div>
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <MarketAnalysisPanel
                timeframe={marketData.timeframe}
                lastUpdated={marketData.lastUpdated}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SignalPanel signal={signalData} />
                <RiskManagementPanel
                  parameters={riskData}
                  currentPrice={signalData.price}
                  direction={signalData.type === "buy" ? "long" : "short"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
