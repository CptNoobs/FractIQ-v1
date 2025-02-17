import { Link, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  LineChart,
  Brain,
  BookOpen,
  Settings,
  Users,
  Target,
  Coins,
  Activity,
  Sparkles,
} from "lucide-react";

export function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Trading",
      items: [
        { name: "Overview", icon: <Activity />, path: "/dashboard" },
        { name: "Analysis", icon: <LineChart />, path: "/dashboard/analysis" },
        { name: "Patterns", icon: <Sparkles />, path: "/dashboard/patterns" },
      ],
    },
    {
      title: "AI Tools",
      items: [
        { name: "Journal", icon: <BookOpen />, path: "/dashboard/journal" },
        { name: "Insights", icon: <Brain />, path: "/dashboard/insights" },
        { name: "Learn", icon: <Target />, path: "/dashboard/learn" },
      ],
    },
    {
      title: "Account",
      items: [
        { name: "Tokens", icon: <Coins />, path: "/dashboard/tokens" },
        { name: "Community", icon: <Users />, path: "/dashboard/community" },
        { name: "Settings", icon: <Settings />, path: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 border-r bg-card/50 backdrop-blur h-screen fixed left-0 top-0"
    >
      <div className="p-4 border-b bg-background/50 backdrop-blur">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
        >
          FractIQ
        </motion.h1>
      </div>

      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="p-4 space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-sm font-semibold text-muted-foreground mb-2">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 3 + itemIndex) * 0.1 }}
                  >
                    <Link to={item.path}>
                      <Button
                        variant={
                          location.pathname === item.path
                            ? "secondary"
                            : "ghost"
                        }
                        className={`w-full justify-start gap-2 relative group ${location.pathname === item.path ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-muted/50"}`}
                      >
                        <span
                          className={`${location.pathname === item.path ? "text-primary" : "group-hover:text-primary transition-colors"}`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge
                            className="ml-auto animate-pulse"
                            variant={
                              location.pathname === item.path
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {location.pathname === item.path && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-md bg-primary/10 -z-10"
                          />
                        )}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
