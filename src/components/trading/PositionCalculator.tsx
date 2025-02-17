import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Target, AlertTriangle } from "lucide-react";

export function PositionCalculator() {
  const [accountSize, setAccountSize] = useState<number>(10000);
  const [riskPercentage, setRiskPercentage] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(1);

  const calculatePosition = () => {
    if (!entryPrice || !stopLoss) return null;

    const riskAmount = (accountSize * riskPercentage) / 100;
    const priceDifference = Math.abs(entryPrice - stopLoss);
    const riskPerUnit = priceDifference / entryPrice;
    const positionSize = (riskAmount / riskPerUnit) * leverage;

    return {
      riskAmount,
      positionSize: positionSize / entryPrice,
      effectiveSize: positionSize,
      liquidationPrice: stopLoss,
    };
  };

  const position = calculatePosition();

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Position Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Account Size</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(Number(e.target.value))}
                className="pl-8"
              />
            </div>
          </div>

          <div>
            <Label>Risk Percentage</Label>
            <div className="relative">
              <Target className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(Number(e.target.value))}
                className="pl-8"
                step="0.1"
                min="0.1"
                max="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Entry Price</Label>
              <Input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Stop Loss</Label>
              <Input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label>Leverage</Label>
            <Input
              type="number"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              min="1"
              step="1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">
              Risk Amount
            </div>
            <div className="text-2xl font-bold">
              ${position?.riskAmount.toFixed(2)}
            </div>
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">
              Position Size
            </div>
            <div className="text-2xl font-bold">
              {position?.positionSize.toFixed(4)} units
            </div>
            <div className="text-sm text-muted-foreground">
              ${position?.effectiveSize.toFixed(2)} total
            </div>
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="text-sm text-muted-foreground mb-1">
              Liquidation Price
            </div>
            <div className="text-2xl font-bold">
              ${position?.liquidationPrice.toFixed(2)}
            </div>
          </Card>

          {leverage > 1 && (
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">
                High leverage increases liquidation risk
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
