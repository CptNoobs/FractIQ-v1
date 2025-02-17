import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useApp } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Brain,
  DollarSign,
  Key,
} from "lucide-react";

export default function SettingsPage() {
  const { state, updateSettings } = useApp();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async (section: string, values: any) => {
    try {
      setLoading(true);
      await updateSettings({ [section]: values });
      toast({
        title: "Settings Updated",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">General Settings</h2>
            {/* Add general settings */}
          </Card>
        </TabsContent>

        <TabsContent value="trading">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">Trading Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Default Position Size</Label>
                  <p className="text-sm text-muted-foreground">
                    Set your default trading position size
                  </p>
                </div>
                <Input
                  type="number"
                  value={state.settings?.trading.defaultPositionSize}
                  onChange={(e) =>
                    handleSave("trading", {
                      ...state.settings?.trading,
                      defaultPositionSize: parseFloat(e.target.value),
                    })
                  }
                  className="w-[200px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Risk Per Trade (%)</Label>
                  <p className="text-sm text-muted-foreground">
                    Maximum risk percentage per trade
                  </p>
                </div>
                <Input
                  type="number"
                  value={state.settings?.trading.riskPerTrade}
                  onChange={(e) =>
                    handleSave("trading", {
                      ...state.settings?.trading,
                      riskPerTrade: parseFloat(e.target.value),
                    })
                  }
                  className="w-[200px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Adjust Position</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically adjust position size based on risk
                  </p>
                </div>
                <Switch
                  checked={state.settings?.trading.autoAdjustPosition}
                  onCheckedChange={(checked) =>
                    handleSave("trading", {
                      ...state.settings?.trading,
                      autoAdjustPosition: checked,
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="p-6 space-y-6">
            <h2 className="text-xl font-semibold">AI Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Minimum Confidence (%)</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimum AI confidence level for signals
                  </p>
                </div>
                <Input
                  type="number"
                  value={state.settings?.ai.minConfidence}
                  onChange={(e) =>
                    handleSave("ai", {
                      ...state.settings?.ai,
                      minConfidence: parseFloat(e.target.value),
                    })
                  }
                  className="w-[200px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Pattern Sensitivity</Label>
                  <p className="text-sm text-muted-foreground">
                    Adjust AI pattern detection sensitivity
                  </p>
                </div>
                <select
                  value={state.settings?.ai.patternSensitivity}
                  onChange={(e) =>
                    handleSave("ai", {
                      ...state.settings?.ai,
                      patternSensitivity: e.target.value,
                    })
                  }
                  className="w-[200px] rounded-md border px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Add other tabs content */}
      </Tabs>
    </div>
  );
}
