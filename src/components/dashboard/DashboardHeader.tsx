import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Search, User } from "lucide-react";
import { TokenPrice } from "./TokenPrice";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b glass glass-hover"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search signals, patterns..."
              className="w-full rounded-full bg-muted/50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TokenPrice />

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10"
          >
            <Bell className="h-5 w-5" />
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center animate-pulse"
              variant="destructive"
            >
              3
            </Badge>
          </Button>

          <Link to="/dashboard/settings">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <Avatar className="h-8 w-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
            <AvatarImage
              src={
                user?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=trader"
              }
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.div>
  );
}
