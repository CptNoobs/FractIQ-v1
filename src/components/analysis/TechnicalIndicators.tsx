import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, Activity, AlertTriangle } from "lucide-react";

interface IndicatorData {
  name: string;
  value: number;
  signal: "buy" | "sell" | "neutral";
  strength: number;
  timeframe: string;
}

export function TechnicalIndicators() {
  const indicators: IndicatorData[] = [
    {
      name: "RSI",
      value: 68.5,
      signal: "neutral",
      strength: 75,
      timeframe: "4h",
    },
    {
      name: "MACD",
      value: 245.75,
      signal: "buy",
      strength: 82,
      timeframe: "4h",
    },
    {
      name: "Stochastic",
      value: 82.3,
      signal: "sell",
      strength: 65,
      timeframe: "4h",
    },
    {
      name: "Moving Averages",
      value: 48250,
      signal: "buy",
      strength: 88,
      timeframe: "4h",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Technical Indicators</h3>
        </div>
        <Badge variant="outline">4H Timeframe</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator) => (
          <Card key={indicator.name} className="p-4 bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{indicator.name}</span>
              <Badge
                variant={
                  indicator.signal === "buy"
                    ? "default"
                    : indicator.signal === "sell"
                      ? "destructive"
                      : "secondary"
                }
              >
                {indicator.signal.toUpperCase()}
              </Badge>
            </div>
            <div className="text-2xl font-mono mb-2">{indicator.value}</div>
            <Progress value={indicator.strength} />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Signal Strength</span>
              <span>{indicator.strength}%</span>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
