import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  BarChart2,
  Activity,
  Waves,
  Target,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface Study {
  id: string;
  name: string;
  category: "momentum" | "volume" | "trend" | "volatility";
  signal: "buy" | "sell" | "neutral";
  value: number;
  threshold: number;
  description: string;
}

export function ChartStudies() {
  const [activeStudies, setActiveStudies] = useState<string[]>([]);

  const studies: Study[] = [
    {
      id: "rsi",
      name: "RSI (14)",
      category: "momentum",
      signal: "sell",
      value: 72,
      threshold: 70,
      description: "Overbought conditions",
    },
    {
      id: "macd",
      name: "MACD",
      category: "momentum",
      signal: "buy",
      value: 245.75,
      threshold: 0,
      description: "Bullish crossover",
    },
    {
      id: "volume_sma",
      name: "Volume SMA",
      category: "volume",
      signal: "buy",
      value: 1.5,
      threshold: 1,
      description: "Above average volume",
    },
    {
      id: "bb_width",
      name: "BB Width",
      category: "volatility",
      signal: "neutral",
      value: 2.5,
      threshold: 2,
      description: "Increased volatility",
    },
  ];

  const toggleStudy = (id: string) => {
    setActiveStudies((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Technical Studies</h3>
        </div>
        <Badge variant="outline">{activeStudies.length} Active</Badge>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {Object.entries(
            studies.reduce(
              (acc, study) => {
                if (!acc[study.category]) acc[study.category] = [];
                acc[study.category].push(study);
                return acc;
              },
              {} as Record<string, Study[]>,
            ),
          ).map(([category, categoryStudies]) => (
            <div key={category} className="space-y-2">
              <h4 className="font-medium capitalize">{category}</h4>
              {categoryStudies.map((study) => (
                <Card
                  key={study.id}
                  className={`p-4 ${activeStudies.includes(study.id) ? "bg-primary/10" : "bg-muted/50"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={activeStudies.includes(study.id)}
                        onCheckedChange={() => toggleStudy(study.id)}
                      />
                      <Label>{study.name}</Label>
                    </div>
                    <Badge
                      variant={
                        study.signal === "buy"
                          ? "default"
                          : study.signal === "sell"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {study.signal === "buy" ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : study.signal === "sell" ? (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      ) : null}
                      {study.value}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {study.description}
                  </p>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
