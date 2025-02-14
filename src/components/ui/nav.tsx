import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  Brain,
  BookOpen,
  ScrollText,
  LogOut,
  Coins,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { TokenBalance } from "@/components/token/TokenBalance";

export function Nav() {
  const { signOut } = useAuth();

  return (
    <div className="flex items-center justify-between w-full">
      <nav className="flex items-center space-x-4">
        <Link
          to="/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className="sr-only">Dashboard</span>
        </Link>
        <Link
          to="/analysis"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          <LineChart className="h-4 w-4" />
          <span className="sr-only">Analysis</span>
        </Link>
        <Link
          to="/insights"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          <Brain className="h-4 w-4" />
          <span className="sr-only">Insights</span>
        </Link>
        <Link
          to="/learn"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          <BookOpen className="h-4 w-4" />
          <span className="sr-only">Learn</span>
        </Link>
        <Link
          to="/journal"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          <ScrollText className="h-4 w-4" />
          <span className="sr-only">Journal</span>
        </Link>
        <Link
          to="/tokens"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          <Coins className="h-4 w-4" />
          <span className="sr-only">Tokens</span>
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <TokenBalance />
        <button
          onClick={signOut}
          className="text-sm font-medium transition-colors hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Logout</span>
        </button>
      </div>
    </div>
  );
}
