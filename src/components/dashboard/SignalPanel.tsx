import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  AlertCircle,
  Clock,
} from "lucide-react";

interface SignalData {
  type: "buy" | "sell" | "hold";
  strength: number;
  price: number;
  timestamp: string;
  confidence: number;
}

interface SignalPanelProps {
  signal?: SignalData;
}

const defaultSignal: SignalData = {
  type: "buy",
  strength: 8,
  price: 45250.75,
  timestamp: new Date().toISOString(),
  confidence: 85,
};

export function SignalPanel({ signal = defaultSignal }: SignalPanelProps) {
  const getSignalColor = (type: string) => {
    switch (type) {
      case "buy":
        return "bg-green-500/10 text-green-500";
      case "sell":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowUpCircle className="h-6 w-6" />;
      case "sell":
        return <ArrowDownCircle className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  return (
    <Card className="p-6 bg-background w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Trading Signal</h2>
          <Badge variant="outline">
            <Clock className="h-4 w-4 mr-1" />
            Live
          </Badge>
        </div>

        <div
          className={`flex items-center justify-between p-4 rounded-lg ${getSignalColor(
            signal.type,
          )}`}
        >
          <div className="flex items-center gap-3">
            {getSignalIcon(signal.type)}
            <div>
              <p className="text-lg font-semibold capitalize">{signal.type}</p>
              <p className="text-sm opacity-80">Signal Type</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{signal.strength}/10</p>
            <p className="text-sm opacity-80">Strength</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">Price</span>
            </div>
            <p className="text-lg font-semibold">
              ${signal.price.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Confidence</span>
            </div>
            <p className="text-lg font-semibold">{signal.confidence}%</p>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Execute {signal.type.toUpperCase()} Signal
        </Button>
      </div>
    </Card>
  );
}
