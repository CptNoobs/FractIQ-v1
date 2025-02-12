import React from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, HelpCircle } from "lucide-react";

interface WavePoint {
  x: number;
  y: number;
  waveNumber: number;
  subWave: string;
}

interface WavePatternDisplayProps {
  currentWave?: number;
  subWave?: string;
  wavePoints?: WavePoint[];
  trendDirection?: "up" | "down";
  confidence?: number;
}

const defaultWavePoints: WavePoint[] = [
  { x: 0, y: 50, waveNumber: 1, subWave: "a" },
  { x: 20, y: 80, waveNumber: 1, subWave: "b" },
  { x: 40, y: 30, waveNumber: 2, subWave: "a" },
  { x: 60, y: 70, waveNumber: 2, subWave: "b" },
  { x: 80, y: 40, waveNumber: 3, subWave: "a" },
  { x: 100, y: 60, waveNumber: 3, subWave: "b" },
];

const WavePatternDisplay = ({
  currentWave = 2,
  subWave = "b",
  wavePoints = defaultWavePoints,
  trendDirection = "up",
  confidence = 75,
}: WavePatternDisplayProps) => {
  return (
    <Card className="p-6 bg-background w-full h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Wave Pattern Analysis</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Current Elliott Wave pattern visualization</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={trendDirection === "up" ? "default" : "destructive"}>
            {trendDirection === "up" ? (
              <ArrowUpCircle className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 mr-1" />
            )}
            Wave {currentWave}
            {subWave}
          </Badge>
          <Badge variant="secondary">{confidence}% Confidence</Badge>
        </div>
      </div>

      <div className="relative w-full h-[300px] border rounded-lg p-4">
        {/* Placeholder for wave pattern visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Wave Pattern Visualization</p>
            <p className="text-sm">
              Interactive chart would be implemented here
            </p>
          </div>
        </div>

        {/* Wave markers - simplified representation */}
        <div className="absolute bottom-0 w-full flex justify-between px-4">
          {[1, 2, 3, 4, 5].map((wave) => (
            <div
              key={wave}
              className={`text-sm ${wave === currentWave ? "text-primary font-bold" : "text-muted-foreground"}`}
            >
              Wave {wave}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WavePatternDisplay;
