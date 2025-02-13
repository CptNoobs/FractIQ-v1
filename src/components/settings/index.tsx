import { Card } from "@/components/ui/card";
import { BinanceKeyForm } from "@/components/exchange/BinanceKeyForm";

import { Key } from "lucide-react";
import { ThemeSettings } from "./ThemeSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Cpu, Lock, Sliders, Shield, Wallet, Waves } from "lucide-react";
import { marketData } from "@/lib/market-data";

import { useSettings } from "@/hooks/useSettings";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Settings() {
  const { settings, isLoading, saveSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = async () => {
    if (!localSettings) return;

    const success = await saveSettings(localSettings);
    if (success) {
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (
    section: keyof typeof localSettings,
    key: string,
    value: any,
  ) => {
    setLocalSettings((prev) =>
      prev
        ? {
            ...prev,
            [section]: {
              ...prev[section],
              [key]: value,
            },
          }
        : null,
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your preferences and account settings
            </p>
          </div>
        </div>

        <ThemeSettings />

        {/* Trading Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Trading Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Default Position Size (%)</Label>
              <Input
                type="number"
                className="w-[180px]"
                value={localSettings?.trading.defaultPositionSize || 1}
                onChange={(e) =>
                  handleChange(
                    "trading",
                    "defaultPositionSize",
                    parseFloat(e.target.value),
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Risk per Trade (%)</Label>
              <Input
                type="number"
                className="w-[180px]"
                value={localSettings?.trading.riskPerTrade || 1}
                onChange={(e) =>
                  handleChange(
                    "trading",
                    "riskPerTrade",
                    parseFloat(e.target.value),
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Auto-adjust Position Size</Label>
              <Switch
                checked={localSettings?.trading.autoAdjustPosition || false}
                onCheckedChange={(checked) =>
                  handleChange("trading", "autoAdjustPosition", checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Data Stream Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Waves className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Market Data</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Data Stream</Label>
                <p className="text-sm text-muted-foreground">
                  Enable real-time market data without API keys
                </p>
              </div>
              <Switch
                checked={localSettings?.trading.publicDataStream || false}
                onCheckedChange={(checked) => {
                  handleChange("trading", "publicDataStream", checked);
                  if (checked) {
                    marketData.enable();
                  } else {
                    marketData.disable();
                  }
                }}
              />
            </div>
          </div>
        </Card>

        {/* AI Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="h-5 w-5" />
            <h2 className="text-xl font-semibold">AI Configuration</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Minimum Signal Confidence (%)</Label>
              <Input
                type="number"
                className="w-[180px]"
                value={localSettings?.ai.minConfidence || 75}
                onChange={(e) =>
                  handleChange(
                    "ai",
                    "minConfidence",
                    parseFloat(e.target.value),
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Pattern Recognition Sensitivity</Label>
              <Select
                value={localSettings?.ai.patternSensitivity || "medium"}
                onValueChange={(value) =>
                  handleChange("ai", "patternSensitivity", value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select sensitivity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Auto-update Models</Label>
              <Switch
                checked={localSettings?.ai.autoUpdateModels || false}
                onCheckedChange={(checked) =>
                  handleChange("ai", "autoUpdateModels", checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email Alerts</Label>
              <Switch
                checked={localSettings?.notifications.email || false}
                onCheckedChange={(checked) =>
                  handleChange("notifications", "email", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Push Notifications</Label>
              <Switch
                checked={localSettings?.notifications.push || false}
                onCheckedChange={(checked) =>
                  handleChange("notifications", "push", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Signal Alerts</Label>
              <Switch
                checked={localSettings?.notifications.signals || false}
                onCheckedChange={(checked) =>
                  handleChange("notifications", "signals", checked)
                }
              />
            </div>
          </div>
        </Card>

        {/* Exchange Configuration */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Exchange Configuration</h2>
          </div>
          <BinanceKeyForm />
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Two-Factor Authentication</Label>
              <Switch
                checked={localSettings?.security.twoFactorEnabled || false}
                onCheckedChange={(checked) =>
                  handleChange("security", "twoFactorEnabled", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>API Key Management</Label>
              <Button variant="outline" className="gap-2">
                <Lock className="h-4 w-4" /> Manage Keys
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Changes */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setLocalSettings(settings)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
