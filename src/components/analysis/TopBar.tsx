import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Waves,
  DollarSign,
  Clock,
  Target,
  AlertTriangle,
} from "lucide-react";

interface TopBarProps {
  data: {
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    openInterest?: number;
    fundingRate?: number;
    marketCap?: number;
  };
  wavePattern?: {
    current: number;
    confidence: number;
    pattern: string;
    direction: "up" | "down";
    targets: Array<{
      price: number;
      probability: number;
      wave: number;
    }>;
    nextPrediction?: {
      pattern: string;
      confidence: number;
      timeframe: string;
    };
  };
}

export function TopBar({ data, wavePattern }: TopBarProps) {
  const nextTarget = wavePattern?.targets?.[0] || { price: 0, probability: 0 };

  return (
    <div className="h-16 border-b bg-card grid grid-cols-7 divide-x">
      {/* Price Info */}
      <div className="flex items-center justify-between px-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{data.symbol}</span>
            <span className="text-lg font-mono">
              ${data.price.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            Live
          </div>
        </div>
        <Badge
          variant={data.change24h >= 0 ? "default" : "destructive"}
          className="text-xs"
        >
          {data.change24h >= 0 ? "+" : ""}
          {data.change24h}%
        </Badge>
      </div>

      {/* Volume */}
      <div className="px-4 flex flex-col justify-center">
        <div className="text-sm font-medium">
          ${(data.volume24h / 1000000).toFixed(2)}M
        </div>
        <div className="text-xs text-muted-foreground">24h Volume</div>
      </div>

      {/* High/Low */}
      <div className="px-4 flex flex-col justify-center">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-sm font-medium text-green-500">
              ${data.high24h.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">24h High</div>
          </div>
          <div>
            <div className="text-sm font-medium text-red-500">
              ${data.low24h.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">24h Low</div>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="px-4 flex flex-col justify-center">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-sm font-medium">
              {data.fundingRate
                ? `${(data.fundingRate * 100).toFixed(4)}%`
                : "--"}
            </div>
            <div className="text-xs text-muted-foreground">Funding Rate</div>
          </div>
          <div>
            <div className="text-sm font-medium">
              $
              {data.openInterest
                ? (data.openInterest / 1000000).toFixed(2) + "M"
                : "--"}
            </div>
            <div className="text-xs text-muted-foreground">Open Interest</div>
          </div>
        </div>
      </div>

      {/* Wave Analysis */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4 text-primary" />
          <div>
            <div className="text-sm font-medium">
              Wave {wavePattern?.current || "-"}
            </div>
            <div className="text-xs text-muted-foreground">
              {wavePattern?.pattern || "Analyzing..."}
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {wavePattern?.confidence || 0}%
        </Badge>
      </div>

      {/* Pattern Info */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <div>
            <div className="text-sm font-medium">
              {wavePattern?.direction === "up" ? (
                <TrendingUp className="h-3 w-3 inline text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 inline text-red-500 mr-1" />
              )}
              {wavePattern?.nextPrediction?.pattern || "Analyzing..."}
            </div>
            <div className="text-xs text-muted-foreground">
              {wavePattern?.nextPrediction?.timeframe || "4H"} Prediction
            </div>
          </div>
        </div>
      </div>

      {/* Next Target */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <div>
            <div className="text-sm font-medium">
              ${nextTarget.price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Next Target ({nextTarget.probability}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
