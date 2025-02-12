import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, GraduationCap, Play, Star } from "lucide-react";

const courses = [
  {
    title: "Elliott Wave Basics",
    description: "Learn the fundamental principles of Elliott Wave Theory",
    progress: 0,
    duration: "2 hours",
    level: "Beginner",
  },
  {
    title: "Advanced Wave Patterns",
    description: "Master complex wave patterns and corrections",
    progress: 30,
    duration: "3 hours",
    level: "Intermediate",
  },
  {
    title: "AI Trading Integration",
    description: "Combine Elliott Wave with ML algorithms",
    progress: 60,
    duration: "4 hours",
    level: "Advanced",
  },
];

export default function Learn() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Learning Center</h1>
            <p className="text-muted-foreground mt-1">
              Master Elliott Wave Theory and AI Trading
            </p>
          </div>
          <Button className="gap-2">
            <Star className="h-4 w-4" /> Premium Access
          </Button>
        </header>

        {/* Course Grid */}
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
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
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

        {/* Resources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Latest Resources</h3>
            <div className="space-y-4">
              {[
                "Understanding Wave Patterns in Crypto Markets",
                "AI-Powered Trading: A Comprehensive Guide",
                "Risk Management Strategies for Wave Trading",
              ].map((title) => (
                <div
                  key={title}
                  className="p-4 rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">
                        15 min read • Updated 2 days ago
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
                <div className="text-4xl font-bold text-primary mb-2">75%</div>
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
      </div>
    </div>
  );
}
