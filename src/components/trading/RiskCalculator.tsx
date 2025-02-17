import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Shield, Target, TrendingUp, AlertTriangle } from "lucide-react";

export function RiskCalculator() {
  const [accountSize, setAccountSize] = useState<number>(10000);
  const [riskPerTrade, setRiskPerTrade] = useState<number>(1);
  const [winRate, setWinRate] = useState<number>(50);
  const [rewardRatio, setRewardRatio] = useState<number>(2);

  const calculateMetrics = () => {
    const riskAmount = (accountSize * riskPerTrade) / 100;
    const rewardAmount = riskAmount * rewardRatio;
    const expectedValue =
      (winRate / 100) * rewardAmount - ((100 - winRate) / 100) * riskAmount;
    const breakEvenWinRate = (1 / (1 + rewardRatio)) * 100;

    return {
      riskAmount,
      rewardAmount,
      expectedValue,
      breakEvenWinRate,
      profitFactor: (winRate * rewardRatio) / (100 - winRate),
    };
  };

  const metrics = calculateMetrics();

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Risk Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Account Size ($)</Label>
            <Input
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Risk per Trade (%)</Label>
            <Input
              type="number"
              value={riskPerTrade}
              onChange={(e) => setRiskPerTrade(Number(e.target.value))}
              step="0.1"
              min="0.1"
              max="100"
            />
          </div>

          <div>
            <Label>Win Rate (%)</Label>
            <Input
              type="number"
              value={winRate}
              onChange={(e) => setWinRate(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>

          <div>
            <Label>Reward Ratio (R:R)</Label>
            <Input
              type="number"
              value={rewardRatio}
              onChange={(e) => setRewardRatio(Number(e.target.value))}
              step="0.1"
              min="0.1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Risk Amount</div>
              <div className="font-mono">${metrics.riskAmount.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Reward Amount</div>
              <div className="font-mono">
                ${metrics.rewardAmount.toFixed(2)}
              </div>
            </div>
            <Progress
              value={
                (metrics.rewardAmount /
                  (metrics.riskAmount + metrics.rewardAmount)) *
                100
              }
            />
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">
              Expected Value
            </div>
            <div className="text-2xl font-bold">
              ${metrics.expectedValue.toFixed(2)}
              <span className="text-sm text-muted-foreground ml-2">
                per trade
              </span>
            </div>
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">
              Break Even Win Rate
            </div>
            <div className="text-2xl font-bold">
              {metrics.breakEvenWinRate.toFixed(1)}%
            </div>
            <Progress
              value={metrics.breakEvenWinRate}
              className="mt-2"
              variant={
                winRate > metrics.breakEvenWinRate ? "default" : "destructive"
              }
            />
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">
              Profit Factor
            </div>
            <div className="text-2xl font-bold">
              {metrics.profitFactor.toFixed(2)}
            </div>
            <Progress
              value={Math.min(metrics.profitFactor * 20, 100)}
              className="mt-2"
            />
          </Card>

          {metrics.expectedValue < 0 && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">
                Negative expected value - adjust parameters
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
