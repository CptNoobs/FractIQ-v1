import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export function AISignals() {
  const signals = [
    {
      symbol: "BTC/USD",
      type: "buy",
      confidence: 92,
      price: 45250.75,
      target: 48500,
      stopLoss: 44000,
      timeframe: "4h",
      reason: "Wave 3 continuation with strong volume",
    },
    {
      symbol: "ETH/USD",
      type: "sell",
      confidence: 88,
      price: 2800.5,
      target: 2650,
      stopLoss: 2900,
      timeframe: "1h",
      reason: "Double top formation at resistance",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Trading Signals</h3>
        </div>
        <Badge variant="outline">Live</Badge>
      </div>

      <div className="space-y-4">
        {signals.map((signal, i) => (
          <motion.div
            key={signal.symbol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-lg bg-muted/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {signal.type === "buy" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className="font-medium">{signal.symbol}</span>
              </div>
              <Badge
                variant={signal.type === "buy" ? "default" : "destructive"}
                className="font-mono"
              >
                {signal.confidence}% Confidence
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
              <div>
                <div className="text-muted-foreground">Entry</div>
                <div className="font-mono">${signal.price}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Target</div>
                <div className="font-mono">${signal.target}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Stop Loss</div>
                <div className="font-mono">${signal.stopLoss}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Timeframe</div>
                <div className="font-mono">{signal.timeframe}</div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">{signal.reason}</div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
