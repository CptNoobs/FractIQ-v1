import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";
import { type Lesson } from "@/hooks/useCourses";

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

export function LessonContent({ lesson, onComplete }: LessonContentProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="aspect-video rounded-lg bg-muted/50 flex items-center justify-center">
        {lesson.videoUrl ? (
          <video
            className="w-full h-full rounded-lg"
            controls
            src={lesson.videoUrl}
          />
        ) : (
          <div className="text-center text-muted-foreground">
            <Play className="h-12 w-12 mx-auto mb-2" />
            <p>Video content coming soon</p>
          </div>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <div className="text-muted-foreground">
          {lesson.content || "Content coming soon..."}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Duration: {lesson.duration}
        </div>
        <Button
          onClick={onComplete}
          disabled={lesson.completed}
          className="gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          {lesson.completed ? "Completed" : "Mark as Complete"}
        </Button>
      </div>
    </Card>
  );
}
