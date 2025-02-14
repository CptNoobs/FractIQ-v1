import { Card } from "@/components/ui/card";
import { Brain, Target, TrendingUp, Activity } from "lucide-react";

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-medium">AI Signals</span>
        </div>
        <div className="text-2xl font-bold">5</div>
        <div className="text-sm text-muted-foreground">Active Signals</div>
      </Card>

      <Card className="p-4 bg-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-primary" />
          <span className="font-medium">Win Rate</span>
        </div>
        <div className="text-2xl font-bold">85%</div>
        <div className="text-sm text-muted-foreground">Last 30 Days</div>
      </Card>

      <Card className="p-4 bg-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span className="font-medium">Profit</span>
        </div>
        <div className="text-2xl font-bold">+12.5%</div>
        <div className="text-sm text-muted-foreground">Monthly Return</div>
      </Card>

      <Card className="p-4 bg-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="font-medium">Active Trades</span>
        </div>
        <div className="text-2xl font-bold">3</div>
        <div className="text-sm text-muted-foreground">Open Positions</div>
      </Card>
    </div>
  );
}
