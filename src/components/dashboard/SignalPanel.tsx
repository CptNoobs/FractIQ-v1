import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  AlertCircle,
  Clock,
  Brain,
  RefreshCw,
} from "lucide-react";
import { signalGenerator } from "@/lib/ai/signal-generator";
import type { Signal } from "@/types/api";

interface SignalPanelProps {
  symbol?: string;
  onExecute?: (signal: Signal) => void;
}

export function SignalPanel({
  symbol = "BTCUSDT",
  onExecute,
}: SignalPanelProps) {
  const [signal, setSignal] = useState<Signal | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSignal = async () => {
    try {
      setLoading(true);
      const newSignal = await signalGenerator.generateSignal(symbol);
      setSignal(newSignal);
    } catch (error) {
      console.error("Failed to generate signal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateSignal();
    // Auto-refresh every 5 minutes
    const interval = setInterval(generateSignal, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [symbol]);

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

  if (!signal) {
    return (
      <Card className="p-6 bg-background w-full h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-8 w-8 text-primary mb-4 mx-auto animate-pulse" />
          <p className="text-muted-foreground">Generating signal...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">AI Signal</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(signal.timestamp).toLocaleTimeString()}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={generateSignal}
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
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
              <p className="text-sm opacity-80">{symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{signal.confidence}%</p>
            <p className="text-sm opacity-80">Confidence</p>
          </div>
        </div>

        <div className="space-y-4">
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
                <span className="text-sm">Strength</span>
              </div>
              <Progress value={signal.confidence} />
            </div>
          </div>

          {signal.aiReason && (
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">AI Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground">{signal.aiReason}</p>
            </div>
          )}
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={() => onExecute?.(signal)}
          disabled={signal.type === "hold"}
        >
          Execute {signal.type.toUpperCase()} Signal
        </Button>
      </div>
    </Card>
  );
}
