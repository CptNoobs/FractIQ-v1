import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  TrendingUp,
  Activity,
  Sparkles,
  ChevronRight,
  Star,
  Shield,
  BookOpen,
  Waves,
  Zap,
  ArrowRight,
  Coins,
  Lock,
  LineChart,
  Users,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(74, 222, 128, 0.1) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6" variant="outline">
              <Star className="mr-2 h-3 w-3" /> Trusted by 10,000+ Traders
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Turn Market Patterns Into Profitable Opportunities
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our AI detects high-probability setups while you earn passive
              income through WAVE token staking. Join thousands of traders
              already benefiting from our 92% pattern detection accuracy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  Start 14-Day Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                >
                  View Pricing <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Pattern Accuracy",
                value: "92%",
                subtext: "AI Detection Rate",
                icon: <Brain className="h-5 w-5 text-primary" />,
              },
              {
                title: "Total Value Locked",
                value: "$5.2M",
                subtext: "In WAVE Tokens",
                icon: <Lock className="h-5 w-5 text-green-500" />,
              },
              {
                title: "Staking APY",
                value: "8-15%",
                subtext: "Passive Returns",
                icon: <LineChart className="h-5 w-5 text-blue-500" />,
              },
              {
                title: "Active Traders",
                value: "10K+",
                subtext: "And Growing",
                icon: <Users className="h-5 w-5 text-purple-500" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    {stat.icon}
                    <span className="font-medium">{stat.title}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.subtext}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Problems & Solutions */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <CheckCircle className="mr-2 h-3 w-3" /> Real Solutions for Real
              Traders
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Why Traders Choose Us</h2>
            <p className="text-muted-foreground">
              Proven solutions to common trading challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "consistency",
                title: "Inconsistent Results",
                problem: "Tired of second-guessing your trades?",
                solution:
                  "Our AI Trade Journal analyzes your behavior and provides actionable insights to improve your strategy",
                icon: <Activity className="h-6 w-6" />,
                metrics: [
                  { label: "Win Rate Improvement", value: "65%" },
                  { label: "Risk Management Score", value: "92%" },
                  { label: "Pattern Recognition", value: "85%" },
                ],
              },
              {
                id: "emotions",
                title: "Emotional Trading",
                problem: "Let emotions affect your decisions?",
                solution:
                  "Get objective, data-driven signals that remove emotional bias from your trading",
                icon: <Brain className="h-6 w-6" />,
                metrics: [
                  { label: "Reduced FOMO Trades", value: "82%" },
                  { label: "Better Entry Points", value: "78%" },
                  { label: "Improved Exit Timing", value: "71%" },
                ],
              },
              {
                id: "opportunities",
                title: "Missed Opportunities",
                problem: "Keep missing the best setups?",
                solution:
                  "Our AI monitors markets 24/7 and alerts you to high-probability patterns before they play out",
                icon: <Target className="h-6 w-6" />,
                metrics: [
                  { label: "Pattern Accuracy", value: "92%" },
                  { label: "Average Alert Time", value: "15min" },
                  { label: "Profit Potential", value: "85%" },
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`p-6 transition-all duration-300 cursor-pointer ${expandedCard === item.id ? "scale-105 shadow-lg" : "hover:bg-muted/50"}`}
                  onClick={() =>
                    setExpandedCard(expandedCard === item.id ? null : item.id)
                  }
                >
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.problem}</p>

                  <div
                    className={`transition-all duration-300 ${expandedCard === item.id ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
                  >
                    <div className="p-4 rounded-lg bg-muted mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="font-medium">Solution:</span>
                      </div>
                      <p className="text-sm">{item.solution}</p>
                    </div>

                    <div className="space-y-2">
                      {item.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-muted-foreground">
                            {metric.label}
                          </span>
                          <Badge variant="outline">{metric.value}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* WAVE Token Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Coins className="mr-2 h-3 w-3" /> WAVE Token
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Earn While You Learn</h2>
            <p className="text-muted-foreground mb-4">
              Stake WAVE tokens to earn passive income and unlock premium
              features
            </p>
            <Link to="/tokenomics">
              <Button variant="outline" size="lg" className="mb-8">
                Learn More About WAVE Token{" "}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Staking Rewards",
                description: "Earn up to 15% APY by staking your WAVE tokens",
                features: [
                  "Flexible lock periods",
                  "Compound interest",
                  "Weekly rewards",
                  "No minimum stake",
                ],
                icon: <Coins className="h-6 w-6" />,
              },
              {
                title: "Trading Benefits",
                description: "Reduce fees and access premium features",
                features: [
                  "Up to 50% fee reduction",
                  "Priority signals",
                  "Advanced AI models",
                  "Custom indicators",
                ],
                icon: <Zap className="h-6 w-6" />,
              },
              {
                title: "Governance Rights",
                description: "Shape the future of the platform",
                features: [
                  "Voting rights",
                  "Feature proposals",
                  "Revenue sharing",
                  "Community access",
                ],
                icon: <Users className="h-6 w-6" />,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Start Trading Smarter Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 10,000+ traders already using our platform. No credit card
              required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto gap-2"
                >
                  Compare Plans <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
