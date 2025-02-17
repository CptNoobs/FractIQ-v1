import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Waves, Target, AlertTriangle } from "lucide-react";

interface WaveAnalysis {
  currentWave: number;
  subWave: string;
  pattern: string;
  confidence: number;
  direction: "up" | "down";
  targets: Array<{
    price: number;
    probability: number;
    wave: number;
  }>;
  characteristics: string[];
  warnings: string[];
}

export function WavePatternAnalysis() {
  const analysis: WaveAnalysis = {
    currentWave: 3,
    subWave: "iii",
    pattern: "Impulse Wave",
    confidence: 92,
    direction: "up",
    targets: [
      { price: 48500, probability: 85, wave: 3 },
      { price: 51200, probability: 75, wave: 4 },
      { price: 55000, probability: 65, wave: 5 },
    ],
    characteristics: [
      "Strong momentum with increasing volume",
      "Clear wave structure formation",
      "Previous resistance broken",
      "Fibonacci extension alignment",
    ],
    warnings: [
      "Watch for potential wave 4 pullback",
      "Monitor volume for confirmation",
    ],
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Wave Pattern Analysis</h3>
        </div>
        <Badge variant="outline" className="font-mono">
          Wave {analysis.currentWave}
          {analysis.subWave}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pattern Info */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-medium">Pattern Recognition</span>
            </div>
            <div className="text-2xl font-bold mb-1">{analysis.pattern}</div>
            <Progress value={analysis.confidence} />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>AI Confidence</span>
              <span>{analysis.confidence}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Characteristics</h4>
            {analysis.characteristics.map((char, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-primary" />
                <span>{char}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Targets & Warnings */}
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">Price Targets</h4>
            {analysis.targets.map((target, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">${target.price}</span>
                  <Badge variant="outline">Wave {target.wave}</Badge>
                </div>
                <Progress value={target.probability} />
                <div className="text-xs text-muted-foreground mt-1">
                  {target.probability}% probability
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Risk Warnings</h4>
            {analysis.warnings.map((warning, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-yellow-500"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
