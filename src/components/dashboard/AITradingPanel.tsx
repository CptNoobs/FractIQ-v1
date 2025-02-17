import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface AIAnalysis {
  confidence: number;
  pattern: string;
  prediction: string;
  riskLevel: "low" | "medium" | "high";
  signals: Array<{
    type: string;
    strength: number;
    description: string;
  }>;
}

export function AITradingPanel() {
  // Mock AI analysis - replace with real data
  const analysis: AIAnalysis = {
    confidence: 85,
    pattern: "Wave 3 Impulse",
    prediction: "Strong upward continuation likely",
    riskLevel: "medium",
    signals: [
      {
        type: "MOMENTUM",
        strength: 82,
        description: "Strong bullish momentum on multiple timeframes",
      },
      {
        type: "VOLUME",
        strength: 75,
        description: "Above average volume supporting trend",
      },
    ],
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">AI Analysis</h2>
        </div>
        <Badge variant="outline">{analysis.confidence}% Confidence</Badge>
      </div>

      <div className="space-y-6">
        {/* Pattern Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-primary/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-medium">Pattern Detected</span>
          </div>
          <div className="text-2xl font-bold mb-1">{analysis.pattern}</div>
          <p className="text-sm text-muted-foreground">{analysis.prediction}</p>
        </motion.div>

        {/* AI Signals */}
        <div className="space-y-3">
          {analysis.signals.map((signal, index) => (
            <motion.div
              key={signal.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{signal.type}</span>
                <Badge variant="secondary">{signal.strength}%</Badge>
              </div>
              <Progress value={signal.strength} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {signal.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Risk Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">
              Risk Level: {analysis.riskLevel.toUpperCase()}
            </span>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}
