import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Lock, Star, Zap } from "lucide-react";

const features = [
  {
    title: "Advanced AI Analysis",
    description:
      "Access to our most sophisticated ML models and pattern recognition",
    icon: <Brain className="h-6 w-6" />,
    price: "$49",
    period: "month",
  },
  {
    title: "Real-time Signals",
    description:
      "Instant notifications for high-confidence trading opportunities",
    icon: <Zap className="h-6 w-6" />,
    price: "$99",
    period: "month",
  },
  {
    title: "Custom Algorithms",
    description: "Create and backtest your own trading strategies",
    icon: <Cpu className="h-6 w-6" />,
    price: "$149",
    period: "month",
  },
];

export function PremiumFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-6">
          <div className="space-y-4">
            <div className="p-3 w-fit rounded-lg bg-primary/10">
              {feature.icon}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                {feature.description}
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{feature.price}</span>
              <span className="text-muted-foreground">/{feature.period}</span>
            </div>

            <Button className="w-full gap-2">
              <Lock className="h-4 w-4" /> Unlock Feature
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
