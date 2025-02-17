import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coins, TrendingUp, TrendingDown } from "lucide-react";
import { gsap } from "gsap";

type Transaction = {
  type: "buy" | "sell" | "reward";
  amount: number;
  timestamp: string;
};

export function TokenPrice() {
  const [price, setPrice] = useState<number>(100);
  const [change, setChange] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const transactions: Transaction[] = [
    { type: "reward", amount: 50, timestamp: "2 min ago" },
    { type: "buy", amount: 100, timestamp: "1 hour ago" },
    { type: "sell", amount: 25, timestamp: "3 hours ago" },
  ];

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      const newPrice = 100 + Math.random() * 10;
      const newChange = ((newPrice - price) / price) * 100;
      setPrice(newPrice);
      setChange(newChange);

      if (priceRef.current) {
        gsap.fromTo(
          priceRef.current,
          { scale: 1.1, color: newChange >= 0 ? "#22c55e" : "#ef4444" },
          { scale: 1, color: "currentColor", duration: 0.3 },
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [price]);

  useEffect(() => {
    if (dropdownRef.current && isOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2 },
      );
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Coins className="h-4 w-4 text-primary" />
        <span ref={priceRef}>{price.toFixed(2)} WAVE</span>
        <Badge
          variant={change >= 0 ? "default" : "destructive"}
          className="ml-2"
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </Badge>
      </Button>

      {isOpen && (
        <Card
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-[300px] p-4 z-50"
        >
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Recent Transactions</h3>
            <ScrollArea className="h-[200px]">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-2">
                    {tx.type === "buy" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : tx.type === "sell" ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <Coins className="h-4 w-4 text-primary" />
                    )}
                    <div>
                      <div className="font-medium capitalize">{tx.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {tx.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono">{tx.amount} WAVE</div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </Card>
      )}
    </div>
  );
}
