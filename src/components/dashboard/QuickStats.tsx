import { Card } from "@/components/ui/card";
import { Brain, Target, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function QuickStats() {
  const stats = [
    {
      title: "AI Signals",
      value: "5",
      subtext: "Active Signals",
      icon: <Brain className="h-5 w-5 text-primary" />,
      trend: "+2 today",
    },
    {
      title: "Win Rate",
      value: "85%",
      subtext: "Last 30 Days",
      icon: <Target className="h-5 w-5 text-primary" />,
      trend: "+5% vs last month",
    },
    {
      title: "Profit",
      value: "+12.5%",
      subtext: "Monthly Return",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      trend: "+2.3% today",
    },
    {
      title: "Active Trades",
      value: "3",
      subtext: "Open Positions",
      icon: <Activity className="h-5 w-5 text-primary" />,
      trend: "2 pending signals",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="font-medium">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                {stat.subtext}
              </span>
              <span className="text-sm text-primary">{stat.trend}</span>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
