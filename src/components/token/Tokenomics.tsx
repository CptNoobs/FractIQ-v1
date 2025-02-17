import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Coins,
  Brain,
  Target,
  Users,
  Lock,
  TrendingUp,
  Shield,
  Sparkles,
  BookOpen,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export function Tokenomics() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Coins className="mr-2 h-3 w-3" /> WAVE Token
          </Badge>
          <h1 className="text-4xl font-bold mb-4">WAVE Token Economics</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The backbone of our AI trading ecosystem
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Supply",
              value: "100M",
              subtext: "Fixed Supply",
              icon: <Coins className="h-5 w-5 text-primary" />,
            },
            {
              title: "Staking APY",
              value: "8-15%",
              subtext: "Variable Rate",
              icon: <Lock className="h-5 w-5 text-green-500" />,
            },
            {
              title: "TVL",
              value: "$5.2M",
              subtext: "Total Value Locked",
              icon: <Shield className="h-5 w-5 text-blue-500" />,
            },
            {
              title: "Holders",
              value: "10K+",
              subtext: "Active Users",
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

        {/* Token Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Token Distribution</h2>
            <div className="space-y-4">
              {[
                {
                  label: "Community Rewards",
                  value: 40,
                  icon: <Users className="h-4 w-4" />,
                },
                {
                  label: "Staking Pool",
                  value: 30,
                  icon: <Lock className="h-4 w-4" />,
                },
                {
                  label: "Development",
                  value: 15,
                  icon: <Brain className="h-4 w-4" />,
                },
                {
                  label: "Team & Advisors",
                  value: 10,
                  icon: <Target className="h-4 w-4" />,
                },
                {
                  label: "Reserve",
                  value: 5,
                  icon: <Shield className="h-4 w-4" />,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Token Utility</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Learn & Earn",
                  description:
                    "Earn WAVE tokens by completing courses and improving your trading",
                  icon: <BookOpen className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Staking Rewards",
                  description:
                    "Stake WAVE to earn up to 15% APY and unlock premium features",
                  icon: <Lock className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Trading Benefits",
                  description:
                    "Reduce fees and get priority access to AI signals",
                  icon: <TrendingUp className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Governance",
                  description: "Vote on platform features and token economics",
                  icon: <Users className="h-5 w-5 text-primary" />,
                },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Staking Tiers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Staking Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "Silver",
                tokens: "1,000",
                apy: "8%",
                benefits: [
                  "Basic AI signals",
                  "5% fee reduction",
                  "Community access",
                ],
              },
              {
                tier: "Gold",
                tokens: "5,000",
                apy: "12%",
                benefits: [
                  "Priority AI signals",
                  "15% fee reduction",
                  "Premium features",
                  "Governance rights",
                ],
              },
              {
                tier: "Diamond",
                tokens: "25,000",
                apy: "15%",
                benefits: [
                  "Instant AI signals",
                  "50% fee reduction",
                  "Custom indicators",
                  "Private community",
                  "Direct support",
                ],
              },
            ].map((tier) => (
              <Card key={tier.tier} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tier.tier}</h3>
                <div className="text-2xl font-bold mb-1">
                  {tier.tokens} WAVE
                </div>
                <div className="text-primary mb-4">{tier.apy} APY</div>
                <div className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Start Earning WAVE Tokens</h2>
          <p className="text-muted-foreground mb-8">
            Join our community and earn rewards while improving your trading
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="gap-2">
                View Pricing <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
