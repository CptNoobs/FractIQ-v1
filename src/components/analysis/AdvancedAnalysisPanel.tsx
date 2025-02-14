import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
} from "lucide-react";

interface AnalysisData {
  pattern: string;
  confidence: number;
  signals: Array<{
    type: string;
    strength: number;
    description: string;
  }>;
  levels: {
    r2: number;
    r1: number;
    pivot: number;
    s1: number;
    s2: number;
  };
  indicators: {
    rsi: number;
    macd: string;
    ma: string;
    volume: string;
  };
  risk: {
    volatility: number;
    momentum: number;
    trend: number;
  };
}

const defaultData: AnalysisData = {
  pattern: "Bullish Wave 3",
  confidence: 85,
  signals: [
    { type: "TREND", strength: 75, description: "Strong upward momentum" },
    { type: "REVERSAL", strength: 65, description: "Potential breakout" },
    { type: "VOLUME", strength: 82, description: "Above average volume" },
  ],
  levels: {
    r2: 47850,
    r1: 46250,
    pivot: 45750,
    s1: 44250,
    s2: 43150,
  },
  indicators: {
    rsi: 68,
    macd: "Bullish Cross",
    ma: "Golden Cross",
    volume: "Increasing",
  },
  risk: {
    volatility: 65,
    momentum: 78,
    trend: 82,
  },
};

export function AdvancedAnalysisPanel({ data = defaultData }) {
  return (
    <Card className="p-4">
      <Tabs defaultValue="technical">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="signals">Signals</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">RSI (14)</span>
                <Badge
                  variant={data.indicators.rsi > 70 ? "destructive" : "default"}
                >
                  {data.indicators.rsi}
                </Badge>
              </div>
              <Progress value={data.indicators.rsi} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">MACD</span>
                <Badge>{data.indicators.macd}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MA Cross</span>
                <Badge variant="secondary">{data.indicators.ma}</Badge>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Key Levels</h4>
            <div className="space-y-2">
              {Object.entries(data.levels).map(([level, price]) => (
                <div key={level} className="flex justify-between items-center">
                  <span className="text-sm uppercase">{level}</span>
                  <span className="font-mono">${price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="signals" className="space-y-4 mt-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-medium">Pattern Recognition</span>
            </div>
            <div className="text-2xl font-bold mb-1">{data.pattern}</div>
            <div className="text-sm text-muted-foreground">
              {data.confidence}% Confidence
            </div>
          </div>

          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {data.signals.map((signal, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span className="font-medium">{signal.type}</span>
                    </div>
                    <Badge variant="outline">{signal.strength}%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Volatility</span>
                <span>{data.risk.volatility}%</span>
              </div>
              <Progress value={data.risk.volatility} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Momentum</span>
                <span>{data.risk.momentum}%</span>
              </div>
              <Progress value={data.risk.momentum} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Trend Strength</span>
                <span>{data.risk.trend}%</span>
              </div>
              <Progress value={data.risk.trend} />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">
                High volatility detected. Consider reducing position size.
              </span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
