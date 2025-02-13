import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Waves,
  DollarSign,
  Clock,
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
    wave: {
      current: number;
      confidence: number;
      pattern: string;
    };
    signal: {
      type: string;
      strength: number;
    };
  };
}

export function TopBar({ data }: TopBarProps) {
  return (
    <div className="h-12 border-b bg-card grid grid-cols-6 divide-x">
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
            <div className="text-sm font-medium">Wave {data.wave.current}</div>
            <div className="text-xs text-muted-foreground">
              {data.wave.pattern}
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {data.wave.confidence}%
        </Badge>
      </div>

      {/* AI Signal */}
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <div>
            <div className="text-sm font-medium">{data.signal.type}</div>
            <div className="text-xs text-muted-foreground">AI Signal</div>
          </div>
        </div>
        <Badge
          variant={data.signal.type === "BUY" ? "default" : "destructive"}
          className="text-xs"
        >
          {data.signal.strength}/10
        </Badge>
      </div>
    </div>
  );
}
