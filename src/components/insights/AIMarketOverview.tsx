import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export function AIMarketOverview() {
  const marketOverview = {
    sentiment: "Bullish",
    confidence: 85,
    keyLevels: [
      { price: 48500, type: "resistance", strength: 85 },
      { price: 45000, type: "support", strength: 92 },
    ],
    patterns: [
      { name: "Wave 3", confidence: 92, type: "bullish" },
      { name: "Golden Cross", confidence: 88, type: "bullish" },
    ],
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Market Overview</h3>
        </div>
        <Badge variant="outline" className="font-mono">
          {marketOverview.confidence}% Confidence
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Sentiment */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-medium">Market Sentiment</span>
            </div>
            <div className="text-2xl font-bold mb-1">
              {marketOverview.sentiment}
            </div>
            <Progress value={marketOverview.confidence} />
          </div>

          {/* Key Levels */}
          <div className="space-y-3">
            <h4 className="font-medium">Key Levels</h4>
            {marketOverview.keyLevels.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">${level.price}</span>
                  <Badge
                    variant={level.type === "support" ? "default" : "secondary"}
                  >
                    {level.type.toUpperCase()}
                  </Badge>
                </div>
                <Progress value={level.strength} />
                <div className="text-xs text-muted-foreground mt-1">
                  {level.strength}% Strength
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pattern Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium">Pattern Analysis</h4>
          {marketOverview.patterns.map((pattern, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-muted/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium">{pattern.name}</span>
                </div>
                <Badge
                  variant={
                    pattern.type === "bullish" ? "default" : "destructive"
                  }
                >
                  {pattern.type === "bullish" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {pattern.confidence}%
                </Badge>
              </div>
              <Progress value={pattern.confidence} />
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
