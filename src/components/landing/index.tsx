import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Brain,
  Coins,
  GraduationCap,
  LineChart,
  Sparkles,
  Zap,
  Clock,
  Target,
  TrendingUp,
  ChevronRight,
  Star,
  Shield,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [activeCard, setActiveCard] = useState<
    "pattern" | "risk" | "learning" | null
  >(null);

  const getActiveContent = () => {
    switch (activeCard) {
      case "pattern":
        return {
          title: "Pattern Recognition",
          metrics: [
            { label: "Pattern Recognition", value: 92 },
            { label: "Signal Accuracy", value: 88 },
            { label: "Real-time Analysis", value: 95 },
          ],
        };
      case "risk":
        return {
          title: "Risk Management",
          metrics: [
            { label: "Risk Assessment", value: 85 },
            { label: "Position Sizing", value: 82 },
            { label: "Stop Loss Optimization", value: 90 },
          ],
        };
      case "learning":
        return {
          title: "Learning Progress",
          metrics: [
            { label: "Pattern Mastery", value: 78 },
            { label: "Risk Management", value: 85 },
            { label: "Trading Psychology", value: 88 },
          ],
        };
      default:
        return {
          title: "Overall Progress",
          metrics: [
            { label: "Pattern Recognition", value: 92 },
            { label: "Risk Management", value: 85 },
            { label: "Learning Progress", value: 78 },
          ],
        };
    }
  };

  const content = getActiveContent();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4" variant="outline">
              <Star className="mr-2 h-3 w-3" /> AGI-Powered Trading
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              AGI-Powered <span className="text-primary">Fractal Trading</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover hidden market fractals through advanced AGI analysis
              while minimizing risk through personalized learning.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  Start Trading <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" size="lg">
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-background border-0">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">AI Pattern Detection</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Advanced pattern recognition with real-time market analysis
              </p>
              <Progress value={92} />
              <p className="text-sm text-muted-foreground mt-2">
                92% accuracy in pattern detection
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500/20 via-green-500/10 to-background border-0">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-green-500" />
                <h3 className="font-semibold">Risk Management</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                AI-guided learning reduces risk through personalized insights
              </p>
              <Progress value={45} />
              <p className="text-sm text-muted-foreground mt-2">
                Reduce risk by up to 45%
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background border-0">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold">Learning Integration</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Learn from every trade with AI-powered insights and feedback
              </p>
              <Progress value={85} />
              <p className="text-sm text-muted-foreground mt-2">
                85% improvement in win rate
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Trade Journal Section */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Brain className="mr-2 h-3 w-3" /> AI-Powered Learning
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Learn From Every Trade</h2>
            <p className="text-muted-foreground">
              Our AI analyzes your trading patterns and provides personalized
              insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Card
                className="p-4 bg-muted/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveCard("pattern")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Pattern Recognition</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI identifies your most successful trading patterns
                </p>
              </Card>

              <Card
                className="p-4 bg-muted/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveCard("risk")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Risk Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get personalized risk management suggestions
                </p>
              </Card>

              <Card
                className="p-4 bg-muted/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveCard("learning")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Continuous Learning</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI adapts to your trading style and helps you improve
                </p>
              </Card>
            </div>

            <Card className="p-6 bg-card transition-all duration-300">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-6">{content.title}</h3>
                {content.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{metric.label}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <Progress
                      value={metric.value}
                      className="transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Tokenomics Section */}
      <div className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Coins className="mr-2 h-3 w-3" /> WAVE Token
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Platform Tokenomics</h2>
            <p className="text-muted-foreground">
              Earn and utilize WAVE tokens for advanced features and rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">AI Credits</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Use WAVE tokens to access advanced AI analysis features
              </p>
              <div className="text-2xl font-bold mb-2">100 WAVE</div>
              <p className="text-sm text-muted-foreground">
                Per analysis credit
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Trading Rewards</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Earn WAVE tokens for successful trades and insights
              </p>
              <div className="text-2xl font-bold mb-2">10 WAVE</div>
              <p className="text-sm text-muted-foreground">
                Per verified trade
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Learning Rewards</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Complete courses and earn WAVE tokens while learning
              </p>
              <div className="text-2xl font-bold mb-2">50 WAVE</div>
              <p className="text-sm text-muted-foreground">
                Per course completion
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Staking Benefits</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Stake WAVE tokens to unlock premium features
              </p>
              <div className="text-2xl font-bold mb-2">15% APY</div>
              <p className="text-sm text-muted-foreground">
                180-day lock period
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="gap-2">
              <Coins className="h-4 w-4" /> View Token Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
