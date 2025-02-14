import { useTheme } from "@/components/theme-provider";
import { Label } from "@/components/ui/label";
import { ThemeSelector } from "@/components/theme-selector";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeSettings() {
  const { theme } = useTheme();
  const { state, updateSettings } = useApp();

  const handleChartStyleChange = async (value: string) => {
    if (state.settings) {
      await updateSettings({
        appearance: {
          ...state.settings.appearance,
          chartStyle: value as "candlestick" | "line" | "area",
        },
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Appearance</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Theme</Label>
          <ThemeSelector />
        </div>
        <div className="flex items-center justify-between">
          <Label>Chart Style</Label>
          <Select
            defaultValue={
              state.settings?.appearance.chartStyle || "candlestick"
            }
            onValueChange={handleChartStyleChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="candlestick">Candlestick</SelectItem>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="area">Area</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
