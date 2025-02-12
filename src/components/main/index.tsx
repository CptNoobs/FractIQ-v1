import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart2,
  BookOpen,
  Brain,
  Cpu,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  {
    title: "Dashboard",
    description: "View your trading dashboard",
    icon: <LayoutDashboard className="h-6 w-6" />,
    link: "/dashboard",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Market Analysis",
    description: "Deep dive into market patterns",
    icon: <LineChart className="h-6 w-6" />,
    link: "/analysis",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "AI Insights",
    description: "ML-powered trading recommendations",
    icon: <Brain className="h-6 w-6" />,
    link: "/insights",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Learning Center",
    description: "Elliott Wave theory education",
    icon: <GraduationCap className="h-6 w-6" />,
    link: "/learn",
    color: "bg-orange-500/10 text-orange-500",
  },
];

const recentSignals = [
  {
    pair: "BTC/USD",
    type: "buy",
    confidence: 92,
    timestamp: "2h ago",
  },
  {
    pair: "ETH/USD",
    type: "sell",
    confidence: 88,
    timestamp: "4h ago",
  },
];

export default function Main() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Trader</h1>
            <p className="text-muted-foreground mt-1">
              Your AI trading assistant is ready
            </p>
          </div>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link to={action.link} key={action.title}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`${action.color} p-3 w-fit rounded-lg mb-4`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Signals */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Signals</h3>
              <Target className="h-5 w-5 text-muted-foreground" />
            </div>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {recentSignals.map((signal) => (
                  <div
                    key={signal.pair}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{signal.pair}</p>
                      <p className="text-sm text-muted-foreground">
                        {signal.timestamp}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={
                          signal.type === "buy"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {signal.type.toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {signal.confidence}% confidence
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Market Overview */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Market Overview</h3>
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="h-[200px] flex items-center justify-center border rounded-lg">
              <p className="text-muted-foreground">Market chart preview</p>
            </div>
          </Card>

          {/* AI Status */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">AI System Status</h3>
              <Cpu className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm">ML Models Active</p>
                  <p className="font-medium">4/4</p>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full mt-2">
                  <div className="bg-primary w-full h-full rounded-full" />
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Analysis Confidence</p>
                  <p className="font-medium">92%</p>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full mt-2">
                  <div className="bg-primary w-[92%] h-full rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="w-full justify-start gap-2">
            <BookOpen className="h-4 w-4" /> Documentation
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <GraduationCap className="h-4 w-4" /> Tutorials
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Sparkles className="h-4 w-4" /> Premium Features
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" /> Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
