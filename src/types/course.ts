export type CourseLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type CourseCategory =
  | "fundamentals"
  | "technical-analysis"
  | "risk-management"
  | "psychology"
  | "strategies"
  | "automation";

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: CourseLevel;
  category: CourseCategory;
  progress: number;
  modules: Module[];
  prerequisites?: string[];
  certification?: boolean;
  tags: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  exercises?: Exercise[];
  quiz?: Quiz;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
  resources?: Resource[];
  practiceExercises?: Exercise[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: "simulation" | "analysis" | "quiz" | "practice";
  completed: boolean;
  score?: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
  completed: boolean;
  score?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "article" | "tool";
  url: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  duration: string;
  courses: string[]; // Course IDs in sequence
  certification?: boolean;
}
