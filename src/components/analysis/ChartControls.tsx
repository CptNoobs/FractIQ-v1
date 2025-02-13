import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  CandlestickChart,
  BarChart2,
  Settings,
  Save,
  Share2,
  Maximize2,
  Target,
  Waves,
} from "lucide-react";

interface ChartControlsProps {
  chartType: "candlestick" | "line" | "area";
  showVolume: boolean;
  showGrid: boolean;
  onChartTypeChange: (type: "candlestick" | "line" | "area") => void;
  onToggleVolume: () => void;
  onToggleGrid: () => void;
  onSave: () => void;
  onShare: () => void;
  onMaximize: () => void;
}

export function ChartControls({
  chartType,
  showVolume,
  showGrid,
  onChartTypeChange,
  onToggleVolume,
  onToggleGrid,
  onSave,
  onShare,
  onMaximize,
}: ChartControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {/* Chart Type */}
        <div className="flex items-center gap-1 border rounded-md p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={chartType === "candlestick" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => onChartTypeChange("candlestick")}
              >
                <CandlestickChart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Candlestick</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={chartType === "line" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => onChartTypeChange("line")}
              >
                <LineChart className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Line Chart</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={chartType === "area" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => onChartTypeChange("area")}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Area Chart</TooltipContent>
          </Tooltip>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-1 border rounded-md p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={showVolume ? "secondary" : "ghost"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={onToggleVolume}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Volume</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Target className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Indicator</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Waves className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Wave Patterns</TooltipContent>
          </Tooltip>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={onSave}
              >
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save Chart</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={onShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share Chart</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={onMaximize}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fullscreen</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
