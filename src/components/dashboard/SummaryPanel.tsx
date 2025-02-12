import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Network, Waves } from "lucide-react";

interface SummaryPanelProps {
  activeSignals?: number;
  analyzedPairs?: number;
  aiConfidence?: number;
  lastUpdate?: string;
}

export default function SummaryPanel({
  activeSignals = 5,
  analyzedPairs = 15,
  aiConfidence = 92,
  lastUpdate = new Date().toLocaleString(),
}: SummaryPanelProps) {
  return (
    <Card className="p-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">System Summary</h2>
        <Badge variant="outline" className="text-xs">
          Last Update: {lastUpdate}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">AI Analysis</span>
          </div>
          <div className="text-2xl font-bold">{aiConfidence}%</div>
          <div className="text-sm text-muted-foreground">Confidence Score</div>
        </div>

        <div className="p-4 rounded-lg bg-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Active Signals</span>
          </div>
          <div className="text-2xl font-bold">{activeSignals}</div>
          <div className="text-sm text-muted-foreground">
            Trading Opportunities
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Network className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Market Coverage</span>
          </div>
          <div className="text-2xl font-bold">{analyzedPairs}</div>
          <div className="text-sm text-muted-foreground">Analyzed Pairs</div>
        </div>

        <div className="p-4 rounded-lg bg-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">ML Models</span>
          </div>
          <div className="text-2xl font-bold">4</div>
          <div className="text-sm text-muted-foreground">Active Algorithms</div>
        </div>
      </div>
    </Card>
  );
}
