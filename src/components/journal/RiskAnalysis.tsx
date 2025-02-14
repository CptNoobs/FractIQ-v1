import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, AlertTriangle, TrendingUp, Target } from "lucide-react";
import type { TradeEntry } from "@/types/journal";

interface RiskAnalysisProps {
  trade: TradeEntry;
}

export function RiskAnalysis({ trade }: RiskAnalysisProps) {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Risk Assessment</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Position Size Risk</span>
                <span>
                  {trade.quantity * trade.entryPrice > 10000
                    ? "High"
                    : "Moderate"}
                </span>
              </div>
              <Progress
                value={(trade.quantity * trade.entryPrice) / 100}
                className="h-2"
                variant={
                  trade.quantity * trade.entryPrice > 10000
                    ? "destructive"
                    : "default"
                }
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Stop Loss Distance</span>
                <span>
                  {Math.abs(
                    ((trade.stopLoss - trade.entryPrice) / trade.entryPrice) *
                      100,
                  ).toFixed(2)}
                  %
                </span>
              </div>
              <Progress
                value={Math.abs(
                  ((trade.stopLoss - trade.entryPrice) / trade.entryPrice) *
                    100,
                )}
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Risk/Reward Ratio</span>
                <span>
                  {(
                    (trade.targetPrice - trade.entryPrice) /
                    (trade.entryPrice - trade.stopLoss)
                  ).toFixed(2)}
                </span>
              </div>
              <Progress
                value={
                  ((trade.targetPrice - trade.entryPrice) /
                    (trade.entryPrice - trade.stopLoss)) *
                  20
                }
                className="h-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">AI Insights</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {trade.aiAnalysis?.warnings?.map((warning, i) => (
                <Card
                  key={i}
                  className="p-3 bg-destructive/10 border-destructive/20"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm">{warning}</span>
                  </div>
                </Card>
              ))}

              {trade.aiAnalysis?.suggestedImprovements.map((suggestion, i) => (
                <Card key={i} className="p-3 bg-primary/10 border-primary/20">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
}
