import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, GraduationCap, Zap } from "lucide-react";

const tokenItems = [
  {
    title: "AI Credits",
    description: "Access advanced AI analysis and pattern detection",
    icon: <Brain className="h-6 w-6" />,
    price: 100,
    color: "bg-purple-500/20 text-purple-500",
  },
  {
    title: "Premium Course Access",
    description: "Unlock advanced trading courses and materials",
    icon: <GraduationCap className="h-6 w-6" />,
    price: 500,
    color: "bg-blue-500/20 text-blue-500",
  },
  {
    title: "Signal Boost",
    description: "Get priority access to trading signals",
    icon: <Zap className="h-6 w-6" />,
    price: 200,
    color: "bg-yellow-500/20 text-yellow-500",
  },
  {
    title: "Custom Analysis",
    description: "Request detailed AI analysis for specific patterns",
    icon: <Sparkles className="h-6 w-6" />,
    price: 300,
    color: "bg-green-500/20 text-green-500",
  },
];

import { useTokens } from "@/contexts/TokenContext";

export function TokenStore() {
  const { spendTokens } = useTokens();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tokenItems.map((item) => (
        <Card key={item.title} className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${item.color}`}>{item.icon}</div>
              <Badge variant="outline">{item.price} WAVE</Badge>
            </div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground flex-grow mb-4">
              {item.description}
            </p>
            <Button
              className="w-full"
              onClick={() => spendTokens(item.price, `Purchased ${item.title}`)}
            >
              Purchase
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
