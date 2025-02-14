import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export function AIInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pattern Recognition */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Trading Patterns</h3>
          </div>
          <Badge variant="outline">AI Analysis</Badge>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {/* Pattern items */}
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Breakout Trading</span>
                </div>
                <Badge>85% Success</Badge>
              </div>
              <Progress value={85} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Strong performance in volatile market conditions
              </p>
            </div>
            {/* Add more patterns */}
          </div>
        </ScrollArea>
      </Card>

      {/* Improvement Areas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Areas for Improvement</h3>
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {/* Improvement items */}
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">Risk Management</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Consider tightening stop losses in volatile markets
              </p>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  Suggested Action: Review last 10 trades' R:R ratios
                </span>
              </div>
            </div>
            {/* Add more improvement areas */}
          </div>
        </ScrollArea>
      </Card>

      {/* Market Conditions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Market Adaptation</h3>
          </div>
        </div>

        {/* Market condition analysis */}
      </Card>

      {/* Learning Resources */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Personalized Learning</h3>
          </div>
        </div>

        {/* Personalized learning content */}
      </Card>
    </div>
  );
}
