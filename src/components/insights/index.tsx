import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  LineChart,
  Target,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const insights = [
  {
    pair: "BTC/USD",
    confidence: 92,
    direction: "up",
    wave: 3,
    pattern: "Impulse Wave",
    prediction: "Strong continuation likely",
  },
  {
    pair: "ETH/USD",
    confidence: 85,
    direction: "down",
    wave: 4,
    pattern: "Corrective Wave",
    prediction: "Temporary pullback expected",
  },
];

export default function Insights() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">AI Market Insights</h1>
          <p className="text-muted-foreground mt-1">
            ML-powered analysis and predictions
          </p>
        </header>

        {/* AI Confidence Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Pattern Recognition</h2>
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-6">
              {insights.map((insight) => (
                <div
                  key={insight.pair}
                  className="p-4 rounded-lg bg-muted/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{insight.pair}</h3>
                      <Badge
                        variant={
                          insight.direction === "up" ? "default" : "destructive"
                        }
                        className="flex items-center gap-1"
                      >
                        {insight.direction === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        Wave {insight.wave}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{insight.confidence}%</div>
                      <div className="text-sm text-muted-foreground">
                        Confidence
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pattern</span>
                      <span className="font-medium">{insight.pattern}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prediction</span>
                      <span className="font-medium">{insight.prediction}</span>
                    </div>
                  </div>
                  <Progress value={insight.confidence} className="mt-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Market Sentiment</h2>
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-6">
              <div className="text-center p-6 rounded-lg bg-primary/10">
                <div className="text-4xl font-bold text-primary mb-2">85%</div>
                <p className="text-sm text-muted-foreground">
                  Bullish Sentiment Score
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Wave Alignment</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Pattern Strength</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Trend Confidence</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
