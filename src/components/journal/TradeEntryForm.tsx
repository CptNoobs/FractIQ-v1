import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useJournal } from "@/hooks/useJournal";
import type { TradeEntry, TradeStatus, TradeSentiment } from "@/types/journal";

export function TradeEntryForm() {
  const { toast } = useToast();
  const { addTrade } = useJournal();
  const [loading, setLoading] = useState(false);

  const [trade, setTrade] = useState<Partial<TradeEntry>>({
    symbol: "",
    type: "long",
    status: "planned",
    entryPrice: 0,
    targetPrice: 0,
    stopLoss: 0,
    quantity: 0,
    leverage: 1,
    sentiment: "neutral",
    confidence: 50,
    notes: "",
    tags: [],
    patterns: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTrade(trade as TradeEntry);
      toast({
        title: "Trade Added",
        description: "Your trade has been successfully logged.",
      });
      // Reset form
      setTrade({
        symbol: "",
        type: "long",
        status: "planned",
        entryPrice: 0,
        targetPrice: 0,
        stopLoss: 0,
        quantity: 0,
        leverage: 1,
        sentiment: "neutral",
        confidence: 50,
        notes: "",
        tags: [],
        patterns: [],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add trade. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Trade Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Symbol</Label>
              <Input
                value={trade.symbol}
                onChange={(e) =>
                  setTrade({ ...trade, symbol: e.target.value.toUpperCase() })
                }
                placeholder="BTC/USD"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={trade.type}
                onValueChange={(value) =>
                  setTrade({ ...trade, type: value as "long" | "short" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Entry Price</Label>
                <Input
                  type="number"
                  value={trade.entryPrice}
                  onChange={(e) =>
                    setTrade({
                      ...trade,
                      entryPrice: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={trade.quantity}
                  onChange={(e) =>
                    setTrade({ ...trade, quantity: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stop Loss</Label>
                <Input
                  type="number"
                  value={trade.stopLoss}
                  onChange={(e) =>
                    setTrade({ ...trade, stopLoss: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Target Price</Label>
                <Input
                  type="number"
                  value={trade.targetPrice}
                  onChange={(e) =>
                    setTrade({
                      ...trade,
                      targetPrice: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Leverage</Label>
              <Input
                type="number"
                value={trade.leverage}
                onChange={(e) =>
                  setTrade({ ...trade, leverage: parseFloat(e.target.value) })
                }
                min="1"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={trade.notes}
                onChange={(e) => setTrade({ ...trade, notes: e.target.value })}
                placeholder="Add your trade notes here..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Adding Trade..." : "Add Trade"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
