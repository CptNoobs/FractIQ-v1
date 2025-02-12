import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  Target,
  TrendingDown,
  TrendingUp,
  DollarSign,
  HelpCircle,
} from "lucide-react";

interface RiskParameters {
  stopLoss: number;
  takeProfit: number;
  positionSize: number;
  riskRewardRatio: number;
  confidence: number;
}

interface RiskManagementPanelProps {
  parameters?: RiskParameters;
  currentPrice?: number;
  direction?: "long" | "short";
}

const defaultParameters: RiskParameters = {
  stopLoss: 125.5,
  takeProfit: 145.75,
  positionSize: 1000,
  riskRewardRatio: 2.5,
  confidence: 85,
};

const RiskManagementPanel = ({
  parameters = defaultParameters,
  currentPrice = 135.25,
  direction = "long",
}: RiskManagementPanelProps) => {
  return (
    <Card className="p-6 bg-background w-full h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Risk Management</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Risk management parameters for the current trade</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge
          variant={direction === "long" ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          {direction === "long" ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {direction.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm">Stop Loss</span>
            </div>
            <span className="font-mono">${parameters.stopLoss}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm">Take Profit</span>
            </div>
            <span className="font-mono">${parameters.takeProfit}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Position Size</span>
            </div>
            <span className="font-mono">${parameters.positionSize}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Risk/Reward</span>
              <span className="text-sm font-mono">
                {parameters.riskRewardRatio}:1
              </span>
            </div>
            <Progress value={parameters.riskRewardRatio * 20} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Confidence</span>
              <span className="text-sm font-mono">
                {parameters.confidence}%
              </span>
            </div>
            <Slider
              defaultValue={[parameters.confidence]}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RiskManagementPanel;
