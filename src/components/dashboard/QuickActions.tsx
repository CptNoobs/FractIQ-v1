import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LineChart, Brain, BookOpen, Target, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickActions() {
  const actions = [
    { title: "New Trade", icon: <Plus />, link: "/trade/new" },
    { title: "AI Analysis", icon: <Brain />, link: "/analysis" },
    { title: "Signals", icon: <Target />, link: "/signals" },
    { title: "Journal", icon: <BookOpen />, link: "/journal" },
    { title: "Charts", icon: <LineChart />, link: "/charts" },
  ];

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action) => (
          <Link key={action.title} to={action.link}>
            <Button
              variant="outline"
              className="w-full h-auto aspect-square flex-col gap-2 p-4"
            >
              {action.icon}
              <span className="text-sm">{action.title}</span>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
