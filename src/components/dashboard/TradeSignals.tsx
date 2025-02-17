import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, TrendingUp, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";

type Signal = {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  confidence: number;
  price: number;
  timestamp: string;
  aiReason: string;
};

export function TradeSignals() {
  // Mock signals - replace with real data
  const signals: Signal[] = [
    {
      id: "1",
      symbol: "BTC/USD",
      type: "buy",
      confidence: 92,
      price: 45250.75,
      timestamp: new Date().toISOString(),
      aiReason: "Strong bullish divergence with increasing volume",
    },
    {
      id: "2",
      symbol: "ETH/USD",
      type: "sell",
      confidence: 88,
      price: 2350.25,
      timestamp: new Date().toISOString(),
      aiReason: "Bearish pattern completion at resistance level",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Live AI Signals</h2>
        </div>
        <Badge variant="outline">Real-time</Badge>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {signal.type === "buy" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-semibold">{signal.symbol}</span>
                  </div>
                  <Badge
                    variant={signal.type === "buy" ? "default" : "destructive"}
                  >
                    {signal.confidence}% Confidence
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-mono">
                      ${signal.price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="text-sm">
                      {new Date(signal.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {signal.aiReason}
                </p>

                <Button className="w-full" variant="outline">
                  Execute Trade
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
