import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, TrendingUp, ChevronRight } from "lucide-react";

export function StoryboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">{children}</div>
    </div>
  );
}

export function StoryboardCard({
  title,
  description,
  icon,
  value,
  metric,
  progress,
  className,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  value?: string | number;
  metric?: string;
  progress?: number;
  className?: string;
}) {
  return (
    <Card className={`p-6 hover-card ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-primary">{icon}</div>
        <span className="font-medium">{title}</span>
      </div>
      {value && <div className="text-2xl font-bold">{value}</div>}
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
      {progress !== undefined && <Progress value={progress} className="mt-2" />}
      {metric && (
        <div className="text-sm text-muted-foreground mt-1">{metric}</div>
      )}
    </Card>
  );
}
