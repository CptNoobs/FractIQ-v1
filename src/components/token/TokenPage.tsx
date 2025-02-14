import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TokenBalance } from "./TokenBalance";
import { TokenStore } from "./TokenStore";
import { useTokens } from "@/contexts/TokenContext";
import {
  Coins,
  ArrowUp,
  ArrowDown,
  Brain,
  Target,
  Sparkles,
} from "lucide-react";

export function TokenPage() {
  const { state, earnTokens } = useTokens();
  const [stakingAmount, setStakingAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("30");

  const handleStake = () => {
    const amount = parseFloat(stakingAmount);
    if (isNaN(amount) || amount <= 0) return;

    const apy = {
      "30": 8,
      "90": 12,
      "180": 15,
    }[stakingPeriod];

    earnTokens(
      amount * (apy / 100) * (parseInt(stakingPeriod) / 365),
      `Staking reward for ${stakingPeriod} days`,
    );
    setStakingAmount("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">WAVE Token</h1>
            <p className="text-muted-foreground mt-1">
              Platform currency for advanced features and rewards
            </p>
          </div>
          <TokenBalance balance={state.balance} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Token Store */}
          <div className="md:col-span-2">
            <TokenStore />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Staking Panel */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Stake WAVE Tokens</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      value={stakingAmount}
                      onChange={(e) => setStakingAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <Label>Lock Period</Label>
                    <Select
                      value={stakingPeriod}
                      onValueChange={setStakingPeriod}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days (8% APY)</SelectItem>
                        <SelectItem value="90">90 Days (12% APY)</SelectItem>
                        <SelectItem value="180">180 Days (15% APY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={handleStake}>
                  Stake Tokens
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {state.transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-lg bg-muted/50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {tx.type === "earn" ? (
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{tx.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={tx.type === "earn" ? "default" : "destructive"}
                      >
                        {tx.type === "earn" ? "+" : "-"}
                        {tx.amount} WAVE
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Token Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Token Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Supply</span>
                    <span>10,000,000 WAVE</span>
                  </div>
                  <Progress value={70} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Circulating Supply</span>
                    <span>7,000,000 WAVE</span>
                  </div>
                  <Progress value={70} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Staked</span>
                    <span>3,500,000 WAVE</span>
                  </div>
                  <Progress value={35} />
                </div>
              </div>
            </Card>

            {/* Ways to Earn */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Ways to Earn</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="h-4 w-4 text-primary" />
                    <p className="font-medium">Complete Courses</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn up to 50 WAVE per course
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-primary" />
                    <p className="font-medium">Successful Trades</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn 10 WAVE for each profitable trade
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <p className="font-medium">Refer Friends</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn 100 WAVE per referral
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
