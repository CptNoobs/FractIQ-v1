import { useState, useEffect } from "react";
import { api } from "@/lib/api-client";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
}

export function useCourses() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      // In production, this would fetch from your API
      // const response = await api.getCourses();
      // setModules(response.data);

      // For now, using mock data
      setModules([
        {
          id: "1",
          title: "Elliott Wave Basics",
          description:
            "Learn the fundamental principles of Elliott Wave Theory",
          progress: 75,
          lessons: [
            {
              id: "1-1",
              title: "Introduction to Elliott Wave Theory",
              duration: "15min",
              completed: true,
              videoUrl: "https://example.com/video1",
              content: "Introduction to the basic principles...",
            },
            {
              id: "1-2",
              title: "Wave Patterns and Structure",
              duration: "20min",
              completed: true,
              videoUrl: "https://example.com/video2",
              content: "Understanding wave patterns...",
            },
            {
              id: "1-3",
              title: "Impulse vs Corrective Waves",
              duration: "25min",
              completed: false,
              videoUrl: "https://example.com/video3",
              content: "Differentiating between wave types...",
            },
          ],
        },
        {
          id: "2",
          title: "Advanced Pattern Recognition",
          description: "Master complex wave patterns and market analysis",
          progress: 30,
          lessons: [
            {
              id: "2-1",
              title: "Complex Wave Patterns",
              duration: "30min",
              completed: true,
              videoUrl: "https://example.com/video4",
              content: "Advanced wave patterns...",
            },
            {
              id: "2-2",
              title: "Wave Combinations",
              duration: "25min",
              completed: false,
              videoUrl: "https://example.com/video5",
              content: "Understanding wave combinations...",
            },
          ],
        },
      ]);
    } catch (err) {
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (moduleId: string, lessonId: string) => {
    try {
      // In production, this would call your API
      // await api.markLessonComplete(moduleId, lessonId);

      setModules((prev) =>
        prev.map((module) => {
          if (module.id === moduleId) {
            const updatedLessons = module.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, completed: true } : lesson,
            );
            const completedCount = updatedLessons.filter(
              (l) => l.completed,
            ).length;
            const progress = Math.round(
              (completedCount / updatedLessons.length) * 100,
            );

            return {
              ...module,
              lessons: updatedLessons,
              progress,
            };
          }
          return module;
        }),
      );
    } catch (err) {
      setError("Failed to update lesson status");
    }
  };

  return {
    modules,
    loading,
    error,
    markLessonComplete,
  };
}
