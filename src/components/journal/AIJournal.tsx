import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Shield, BookOpen, TrendingUp } from "lucide-react";
import { JournalOverview } from "./JournalOverview";
import { TradeEntryForm } from "./TradeEntryForm";
import { TradeAnalytics } from "./TradeAnalytics";
import { AIInsights } from "./AIInsights";
import { LearningHub } from "./LearningHub";

export function AIJournal() {
  const [selectedTrade, setSelectedTrade] = useState<TradeEntry | null>(null);
  const [riskMetrics, setRiskMetrics] = useState({
    winRate: 85,
    profitFactor: 2.1,
    averageRR: 1.8,
    maxDrawdown: 12.5,
    learningProgress: 75,
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold">AI Trade Journal</h1>
          <p className="text-muted-foreground">
            Learn and improve with AI-powered trade analysis
          </p>
        </header>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Risk Management</h3>
            </div>
            <div className="text-2xl font-bold">{riskMetrics.averageRR}</div>
            <div className="text-sm text-muted-foreground">
              Average R:R Ratio
            </div>
            <Progress value={riskMetrics.averageRR * 20} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Learning Progress</h3>
            </div>
            <div className="text-2xl font-bold">
              {riskMetrics.learningProgress}%
            </div>
            <div className="text-sm text-muted-foreground">
              Overall Improvement
            </div>
            <Progress value={riskMetrics.learningProgress} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Performance</h3>
            </div>
            <div className="text-2xl font-bold">{riskMetrics.winRate}%</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <Progress value={riskMetrics.winRate} className="mt-2" />
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 h-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="new-trade">New Trade</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <JournalOverview />
          </TabsContent>

          <TabsContent value="new-trade">
            <TradeEntryForm />
          </TabsContent>

          <TabsContent value="analytics">
            <TradeAnalytics />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsights />
          </TabsContent>

          <TabsContent value="learning">
            <LearningHub />
          </TabsContent>

          <TabsContent value="risk">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Risk Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground">
                        Win Rate
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {riskMetrics.winRate}%
                      </div>
                      <Progress value={riskMetrics.winRate} className="mt-2" />
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground">
                        Profit Factor
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {riskMetrics.profitFactor}
                      </div>
                      <Progress
                        value={riskMetrics.profitFactor * 20}
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground">
                        Avg R:R
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {riskMetrics.averageRR}
                      </div>
                      <Progress
                        value={riskMetrics.averageRR * 25}
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4">
                      <div className="text-sm text-muted-foreground">
                        Max Drawdown
                      </div>
                      <div className="text-2xl font-bold text-destructive">
                        {riskMetrics.maxDrawdown}%
                      </div>
                      <Progress
                        value={riskMetrics.maxDrawdown}
                        className="mt-2"
                        variant="destructive"
                      />
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">AI Recommendations</h3>
                  <div className="space-y-3">
                    {[
                      "Reduce position size during high volatility",
                      "Consider wider stops in trending markets",
                      "Implement scaling out strategy",
                      "Review risk per trade allocation",
                    ].map((rec, i) => (
                      <Card key={i} className="p-3 bg-muted/50">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          <span>{rec}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
