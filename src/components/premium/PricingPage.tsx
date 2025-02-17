import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  Star,
  Crown,
  ChevronRight,
  ArrowRight,
  Users,
  Shield,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const plans = [
    {
      name: "Basic",
      description: "Essential AI trading features",
      price: billingCycle === "monthly" ? 49 : 470,
      icon: <Zap className="h-5 w-5 text-primary" />,
      gradient: "from-primary/20 via-primary/10 to-transparent",
      features: [
        "Basic AI pattern detection",
        "100 WAVE tokens monthly",
        "Real-time market data",
        "Basic trading signals",
        "Community access",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      description: "Advanced trading & staking",
      price: billingCycle === "monthly" ? 99 : 950,
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      gradient: "from-yellow-500/20 via-yellow-500/10 to-transparent",
      features: [
        "Advanced AI analysis",
        "500 WAVE tokens monthly",
        "Priority trading signals",
        "Custom indicators",
        "Premium community access",
        "1-on-1 AI training session",
        "Reduced trading fees",
      ],
      cta: "Get Pro Access",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions & max rewards",
      price: billingCycle === "monthly" ? 299 : 2900,
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      features: [
        "Custom AI models",
        "2000 WAVE tokens monthly",
        "Institutional tools",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "Zero trading fees",
        "Private AI training",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Professional Trader",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      quote:
        "The AI pattern detection has completely transformed my trading strategy. I've seen a 40% increase in my win rate.",
    },
    {
      name: "Sarah Chen",
      role: "Crypto Analyst",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      quote:
        "WAVE tokens provide real value. The staking rewards and trading fee reductions make it a no-brainer.",
    },
    {
      name: "Michael Rodriguez",
      role: "Day Trader",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      quote:
        "The community and educational resources are outstanding. It's more than just a trading platform.",
    },
  ];

  const faqs = [
    {
      q: "What's included in the free trial?",
      a: "14-day access to all Pro features including AI analysis, trading signals, and WAVE tokens.",
    },
    {
      q: "Can I upgrade or downgrade my plan?",
      a: "Yes, you can change your plan at any time. Token rewards will be adjusted accordingly.",
    },
    {
      q: "How do WAVE token rewards work?",
      a: "Tokens are distributed monthly and can be staked for additional benefits or used for platform features.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, crypto payments, and bank transfers for yearly plans.",
    },
    {
      q: "Is there a minimum contract period?",
      a: "No, all plans are flexible with no minimum commitment. You can cancel anytime.",
    },
    {
      q: "What happens to my WAVE tokens if I cancel?",
      a: "Your earned WAVE tokens remain yours and can still be traded or staked even after cancellation.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-gradient-x -z-10" />
          <Badge className="mb-4" variant="outline">
            <Star className="mr-2 h-3 w-3" /> Pricing Plans
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Choose Your Trading Edge
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            All plans include AI features and WAVE token rewards
          </p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
              className="relative overflow-hidden"
            >
              <span className="relative z-10">Monthly</span>
              {billingCycle === "monthly" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"
                  layoutId="billing-highlight"
                />
              )}
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
              className="relative overflow-hidden"
            >
              <span className="relative z-10">Yearly (20% off)</span>
              {billingCycle === "yearly" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"
                  layoutId="billing-highlight"
                />
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                  <Badge className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`p-6 ${plan.popular ? "border-primary shadow-lg" : ""} relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    {plan.icon}
                    <h2 className="text-xl font-semibold">{plan.name}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    className="w-full gap-2 relative overflow-hidden group"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform">
                      {plan.cta}
                    </span>
                    <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {plan.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Traders</h2>
            <p className="text-muted-foreground">
              See what our community has to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card className="p-6 hover:bg-muted/50 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition-transform">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                        <Star className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Start Trading Smarter Today
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of traders already using our platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              Schedule Demo <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
