import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, CheckCircle } from "lucide-react";

interface Module {
  title: string;
  lessons: Array<{
    title: string;
    duration: string;
    completed: boolean;
  }>;
  progress: number;
}

const defaultModules: Module[] = [
  {
    title: "Elliott Wave Basics",
    progress: 75,
    lessons: [
      {
        title: "Introduction to Elliott Wave Theory",
        duration: "15min",
        completed: true,
      },
      {
        title: "Wave Patterns and Structure",
        duration: "20min",
        completed: true,
      },
      {
        title: "Impulse vs Corrective Waves",
        duration: "25min",
        completed: false,
      },
    ],
  },
  {
    title: "Advanced Pattern Recognition",
    progress: 30,
    lessons: [
      { title: "Complex Wave Patterns", duration: "30min", completed: true },
      { title: "Wave Combinations", duration: "25min", completed: false },
      { title: "Pattern Validation", duration: "20min", completed: false },
    ],
  },
];

export function CourseStructure({
  modules = defaultModules,
}: {
  modules?: Module[];
}) {
  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-6">
        {modules.map((module, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <Progress value={module.progress} className="mt-2" />
              </div>

              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={lesson.completed ? "text-primary" : ""}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
