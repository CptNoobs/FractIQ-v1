import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Brain,
  Clock,
  Target,
  Zap,
} from "lucide-react";
import MarketAnalysisPanel from "../dashboard/MarketAnalysisPanel";
import RiskManagementPanel from "../dashboard/RiskManagementPanel";
import SignalPanel from "../dashboard/SignalPanel";

export default function Analysis() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Symbol Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">BTC/USD Analysis</h1>
            <p className="text-muted-foreground">
              Detailed market analysis and signals
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Input placeholder="Search symbol..." className="w-[200px]" />
            <Button>Analyze</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="font-medium">2 minutes ago</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="font-medium">92%</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Current Wave</p>
                <p className="font-medium">Wave 3 of 5</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Signal Strength</p>
                <p className="font-medium">Strong Buy</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Analysis Content */}
        <Tabs defaultValue="technical" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="technical">Technical Analysis</TabsTrigger>
            <TabsTrigger value="wave">Wave Analysis</TabsTrigger>
            <TabsTrigger value="signals">Trading Signals</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="space-y-6">
            <MarketAnalysisPanel />
          </TabsContent>

          <TabsContent value="wave" className="space-y-6">
            <MarketAnalysisPanel />
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SignalPanel />
              <RiskManagementPanel />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                AI Analysis Summary
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Pattern Recognition</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI has detected a strong Wave 3 formation with 92%
                    confidence. Historical pattern matching suggests continued
                    upward momentum.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Entry/Exit Points</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optimal entry point detected at $44,250 with initial target
                    at $47,000. Stop loss recommended at $43,500.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
