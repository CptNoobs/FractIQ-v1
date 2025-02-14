import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, CheckCircle, ChevronRight } from "lucide-react";
import { type Module } from "@/hooks/useCourses";

interface CourseNavigationProps {
  modules: Module[];
  selectedLesson: { moduleId: string; lessonId: string } | null;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
}

export function CourseNavigation({
  modules,
  selectedLesson,
  onSelectLesson,
}: CourseNavigationProps) {
  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-6 pr-4">
        {modules.map((module) => (
          <div key={module.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{module.title}</h3>
              <span className="text-sm text-muted-foreground">
                {module.progress}%
              </span>
            </div>

            <div className="space-y-1">
              {module.lessons.map((lesson) => (
                <Button
                  key={lesson.id}
                  variant={
                    selectedLesson?.lessonId === lesson.id
                      ? "secondary"
                      : "ghost"
                  }
                  className="w-full justify-start gap-2"
                  onClick={() => onSelectLesson(module.id, lesson.id)}
                >
                  {lesson.completed ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <BookOpen className="h-4 w-4" />
                  )}
                  <span className="truncate">{lesson.title}</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
