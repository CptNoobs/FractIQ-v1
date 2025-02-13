import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import {
  LayoutDashboard,
  LineChart,
  Brain,
  GraduationCap,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analysis", label: "Analysis", icon: LineChart },
  { href: "/insights", label: "AI Insights", icon: Brain },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Nav({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <nav className={cn("flex items-center space-x-4", className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link key={item.href} to={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className="gap-2"
              size="sm"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
