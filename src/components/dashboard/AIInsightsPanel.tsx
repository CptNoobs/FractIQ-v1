import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

type Insight = {
  id: string;
  title: string;
  description: string;
  confidence: number;
  type: "buy" | "sell" | "hold";
  timestamp: string;
};

import { useTradingStore } from "@/store/tradingStore";
import { useEffect } from "react";
import { wsManager } from "@/lib/websocket";

export function AIInsightsPanel() {
  const { insights, setInsights } = useTradingStore();

  useEffect(() => {
    // Subscribe to AI insights updates
    wsManager.subscribe("ai_insights", (data) => {
      setInsights(data.insights);
    });

    // Initial mock data
    setInsights([
      {
        id: "1",
        title: "Bullish Pattern Detected",
        description: "MTF analysis shows strong buy signal on BTC/USD",
        confidence: 85,
        type: "buy",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Bearish Divergence",
        description: "RSI showing potential reversal on ETH/USD",
        confidence: 75,
        type: "sell",
        timestamp: new Date().toISOString(),
      },
    ]);

    return () => {
      wsManager.unsubscribe("ai_insights", setInsights);
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {insight.title}
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    insight.type === "buy"
                      ? "bg-green-100 text-green-800"
                      : insight.type === "sell"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {insight.confidence}% confidence
                </span>
              </CardTitle>
              <CardDescription>
                {new Date(insight.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
