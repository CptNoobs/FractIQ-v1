import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseNavigation } from "./CourseNavigation";
import { useCourses } from "@/hooks/useCourses";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Play,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LessonContent } from "./LessonContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courses = [
  {
    title: "Market Fundamentals",
    description: "Essential knowledge for all traders",
    progress: 0,
    duration: "4 hours",
    level: "Beginner",
  },
  {
    title: "Technical Analysis",
    description: "Master chart patterns and indicators",
    progress: 30,
    duration: "6 hours",
    level: "Intermediate",
  },
  {
    title: "Risk Management",
    description: "Learn to protect your capital",
    progress: 20,
    duration: "3 hours",
    level: "Beginner",
  },
  {
    title: "Trading Psychology",
    description: "Master your emotions and trading mindset",
    progress: 0,
    duration: "4 hours",
    level: "Intermediate",
  },
  {
    title: "Elliott Wave Theory",
    description: "Advanced wave pattern analysis",
    progress: 0,
    duration: "8 hours",
    level: "Advanced",
  },
  {
    title: "Algorithmic Trading",
    description: "Automate your trading strategies",
    progress: 0,
    duration: "10 hours",
    level: "Expert",
  },
];

export default function Learn() {
  const { modules, loading, error, markLessonComplete } = useCourses();
  const [selectedLesson, setSelectedLesson] = useState<{
    moduleId: string;
    lessonId: string;
  } | null>(null);

  const currentLesson = selectedLesson
    ? modules
        .find((m) => m.id === selectedLesson.moduleId)
        ?.lessons.find((l) => l.id === selectedLesson.lessonId)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[300px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trading Academy</h1>
            <p className="text-muted-foreground mt-1">
              Your journey to becoming a professional trader
            </p>
          </div>
          <Button className="gap-2">
            <Star className="h-4 w-4" /> Premium Access
          </Button>
        </header>

        <Tabs defaultValue="courses">
          <TabsList>
            <TabsTrigger value="courses">All Courses</TabsTrigger>
            <TabsTrigger value="current">Current Course</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.title} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {course.description}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {course.progress}% Complete
                        </span>
                        <span className="text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>
                      <Progress value={course.progress} />
                      <Button className="w-full gap-2">
                        <Play className="h-4 w-4" />
                        {course.progress === 0 ? "Start Course" : "Continue"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <CourseNavigation
                  modules={modules}
                  selectedLesson={selectedLesson}
                  onSelectLesson={(moduleId, lessonId) =>
                    setSelectedLesson({ moduleId, lessonId })
                  }
                />
              </div>

              <div className="lg:col-span-3">
                {currentLesson ? (
                  <LessonContent
                    lesson={currentLesson}
                    onComplete={() =>
                      selectedLesson &&
                      markLessonComplete(
                        selectedLesson.moduleId,
                        selectedLesson.lessonId,
                      )
                    }
                  />
                ) : (
                  <div className="text-center p-12 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Select a lesson to begin
                    </h3>
                    <p>
                      Choose a lesson from the navigation menu to start learning
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Latest Activity</h3>
                <div className="space-y-4">
                  {[
                    "Completed Risk Management Basics",
                    "Started Technical Analysis Course",
                    "Earned Trading Fundamentals Certificate",
                  ].map((activity) => (
                    <div
                      key={activity}
                      className="p-4 rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{activity}</p>
                          <p className="text-sm text-muted-foreground">
                            2 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                <div className="space-y-6">
                  <div className="text-center p-6 rounded-lg bg-primary/10">
                    <div className="text-4xl font-bold text-primary mb-2">
                      75%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Overall Completion Rate
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Courses Completed</span>
                      <span className="font-medium">4/6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time Invested</span>
                      <span className="font-medium">12.5 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Certificates Earned</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
