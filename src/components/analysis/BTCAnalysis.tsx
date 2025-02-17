import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TradingViewChart } from "./TradingViewChart";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Waves,
  LineChart,
  BarChart2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function BTCAnalysis() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main Chart Area */}
      <div className="col-span-12 lg:col-span-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">BTC/USD Analysis</h2>
              </div>
              <Badge variant="outline">Wave 3</Badge>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              Full Analysis <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <TradingViewChart height={400} />
        </Card>
      </div>

      {/* AI Pattern Recognition */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Pattern Recognition</h3>
            </div>
            <Badge variant="outline">Live</Badge>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="h-4 w-4 text-primary" />
                <span className="font-medium">Wave Pattern Detected</span>
              </div>
              <div className="text-2xl font-bold mb-1">Wave 3 Impulse</div>
              <div className="text-sm text-muted-foreground">
                Strong upward momentum detected
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-muted/50">
                <div className="text-sm text-muted-foreground mb-1">
                  Confidence
                </div>
                <div className="text-xl font-bold mb-2">92%</div>
                <Progress value={92} />
              </Card>

              <Card className="p-4 bg-muted/50">
                <div className="text-sm text-muted-foreground mb-1">
                  Accuracy
                </div>
                <div className="text-xl font-bold mb-2">88%</div>
                <Progress value={88} />
              </Card>
            </div>
          </div>
        </Card>

        {/* AI Trade Journal */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Trade Journal</h3>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              View Journal <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="font-medium">Pattern Recognition</span>
              </div>
              <Progress value={85} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                85% improvement in pattern recognition
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">Win Rate</span>
              </div>
              <Progress value={92} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                92% success rate on AI signals
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
