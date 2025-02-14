import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, Waves } from "lucide-react";

interface WaveAnalysisPanelProps {
  data: {
    currentWave: number;
    subWave: string;
    confidence: number;
    pattern: string;
    direction: "up" | "down";
    targets: Array<{
      price: number;
      probability: number;
      wave: number;
    }>;
  };
}

export function WaveAnalysisPanel({ data }: WaveAnalysisPanelProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Wave Analysis</h3>
        </div>
        <Badge variant="outline">{data.direction.toUpperCase()}</Badge>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="font-medium">Current Pattern</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            Wave {data.currentWave}
            {data.subWave}
          </div>
          <div className="text-sm text-muted-foreground">{data.pattern}</div>
          <Progress value={data.confidence} className="mt-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>AI Confidence</span>
            <span>{data.confidence}%</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-medium">Wave Targets</span>
          </div>
          {data.targets.map((target) => (
            <div key={target.wave} className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Wave {target.wave}</span>
                <span className="font-mono">
                  ${target.price.toLocaleString()}
                </span>
              </div>
              <Progress value={target.probability} />
              <div className="text-right mt-1 text-xs text-muted-foreground">
                {target.probability}% probability
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
