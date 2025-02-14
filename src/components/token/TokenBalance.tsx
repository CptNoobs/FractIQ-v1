import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Sparkles, Zap } from "lucide-react";

export function TokenBalance({ balance = 0 }) {
  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-primary" />
        <div>
          <div className="font-medium">WAVE Tokens</div>
          <div className="text-sm text-muted-foreground">Platform Currency</div>
        </div>
      </div>
      <Badge variant="outline" className="font-mono">
        {balance.toLocaleString()} WAVE
      </Badge>
    </Card>
  );
}
