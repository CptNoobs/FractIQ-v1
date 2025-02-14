import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, GraduationCap, Brain, Target, CheckCircle } from "lucide-react";

export function LearningHub() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Learning Path */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Your Learning Path</h3>
          </div>
          <Badge variant="outline">AI Guided</Badge>
        </div>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Learning modules */}
            <div className="relative pl-6 border-l-2 border-primary/30">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="mb-4">
                <h4 className="font-medium mb-1">
                  Pattern Recognition Mastery
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Learn to identify and trade key Elliott Wave patterns
                </p>
                <Progress value={75} />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>75% Complete</span>
                  <span>3/4 Lessons</span>
                </div>
              </div>
            </div>
            {/* Add more modules */}
          </div>
        </ScrollArea>
      </Card>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Progress Overview */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Progress</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
            {/* Add more metrics */}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Achievements</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
              <div className="p-2 rounded-full bg-primary/10">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium">Pattern Master</div>
                <div className="text-xs text-muted-foreground">
                  Identified 10 patterns correctly
                </div>
              </div>
            </div>
            {/* Add more achievements */}
          </div>
        </Card>
      </div>
    </div>
  );
}
