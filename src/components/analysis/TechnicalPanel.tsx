import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  Waves,
  BarChart2,
  LineChart,
} from "lucide-react";

interface TechnicalData {
  indicators: Array<{
    name: string;
    value: number | string;
    signal: "buy" | "sell" | "neutral";
    strength?: number;
  }>;
  oscillators: Array<{
    name: string;
    value: number;
    signal: "buy" | "sell" | "neutral";
    range: [number, number];
  }>;
  movingAverages: Array<{
    period: number;
    value: number;
    type: "SMA" | "EMA";
    signal: "buy" | "sell" | "neutral";
  }>;
  patterns: Array<{
    name: string;
    confidence: number;
    status: "forming" | "confirmed" | "completed";
    direction: "bullish" | "bearish";
  }>;
  levels: Array<{
    name: string;
    price: number;
    type: "support" | "resistance" | "pivot";
    strength: number;
  }>;
  waves: {
    current: number;
    pattern: string;
    confidence: number;
    targets: Array<{
      wave: number;
      price: number;
      probability: number;
    }>;
  };
  volume: {
    current: number;
    average: number;
    trend: "increasing" | "decreasing" | "neutral";
    spikes: Array<{
      time: string;
      value: number;
      type: "buy" | "sell";
    }>;
  };
}

export function TechnicalPanel({ data }: { data: TechnicalData }) {
  return (
    <Card className="p-4">
      <Tabs defaultValue="indicators">
        <TabsList className="grid w-full grid-cols-5 h-8">
          <TabsTrigger value="indicators" className="text-xs">
            Indicators
          </TabsTrigger>
          <TabsTrigger value="oscillators" className="text-xs">
            Oscillators
          </TabsTrigger>
          <TabsTrigger value="patterns" className="text-xs">
            Patterns
          </TabsTrigger>
          <TabsTrigger value="volume" className="text-xs">
            Volume
          </TabsTrigger>
          <TabsTrigger value="waves" className="text-xs">
            Waves
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-220px)] mt-4">
          <TabsContent value="indicators" className="space-y-3">
            {/* Moving Averages */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Moving Averages</h3>
              {data.movingAverages.map((ma) => (
                <div
                  key={`${ma.type}-${ma.period}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {ma.type}-{ma.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      ${ma.value.toLocaleString()}
                    </span>
                    <Badge
                      variant={
                        ma.signal === "buy"
                          ? "default"
                          : ma.signal === "sell"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {ma.signal.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Indicators */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Technical Indicators</h3>
              {data.indicators.map((indicator) => (
                <div
                  key={indicator.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{indicator.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{indicator.value}</span>
                    <Badge
                      variant={
                        indicator.signal === "buy"
                          ? "default"
                          : indicator.signal === "sell"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {indicator.signal.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="oscillators" className="space-y-3">
            {data.oscillators.map((osc) => (
              <div key={osc.name} className="p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{osc.name}</span>
                  </div>
                  <Badge
                    variant={
                      osc.signal === "buy"
                        ? "default"
                        : osc.signal === "sell"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {osc.value}
                  </Badge>
                </div>
                <Progress
                  value={
                    ((osc.value - osc.range[0]) /
                      (osc.range[1] - osc.range[0])) *
                    100
                  }
                  className="h-1"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Oversold ({osc.range[0]})</span>
                  <span>Overbought ({osc.range[1]})</span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="patterns" className="space-y-3">
            {data.patterns.map((pattern) => (
              <div
                key={pattern.name}
                className="p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {pattern.direction === "bullish" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">{pattern.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {pattern.status}
                  </Badge>
                </div>
                <Progress value={pattern.confidence} className="h-1" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Confidence</span>
                  <span>{pattern.confidence}%</span>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="volume" className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Volume Analysis</span>
                </div>
                <Badge
                  variant={
                    data.volume.trend === "increasing"
                      ? "default"
                      : data.volume.trend === "decreasing"
                        ? "destructive"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {data.volume.trend.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-sm text-muted-foreground">Current</div>
                  <div className="font-mono">
                    ${(data.volume.current / 1000000).toFixed(2)}M
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Average</div>
                  <div className="font-mono">
                    ${(data.volume.average / 1000000).toFixed(2)}M
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Volume Spikes</h3>
              {data.volume.spikes.map((spike, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <BarChart2
                      className={
                        spike.type === "buy" ? "text-green-500" : "text-red-500"
                      }
                    />
                    <span className="text-sm">{spike.time}</span>
                  </div>
                  <span className="font-mono text-sm">
                    ${(spike.value / 1000000).toFixed(2)}M
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="waves" className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="h-4 w-4 text-primary" />
                <span className="font-medium">Wave {data.waves.current}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {data.waves.pattern}
              </div>
              <div className="mt-2">
                <Progress value={data.waves.confidence} className="h-1" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Pattern Confidence</span>
                  <span>{data.waves.confidence}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Wave Targets</h3>
              {data.waves.targets.map((target) => (
                <div key={target.wave} className="p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Wave {target.wave} Target</span>
                    <span className="font-mono text-sm">
                      ${target.price.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={target.probability} className="h-1" />
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
  );
}
