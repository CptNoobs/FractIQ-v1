import { Course, LearningPath } from "@/types/course";

export const learningPaths: LearningPath[] = [
  {
    id: "complete-trader",
    title: "Complete Elliott Wave Trader",
    description: "Master Elliott Wave Theory from basics to advanced patterns",
    level: "beginner",
    duration: "6 months",
    courses: [
      "elliott-basics",
      "wave-patterns",
      "advanced-waves",
      "trading-psychology",
      "risk-management",
    ],
    certification: true,
  },
  {
    id: "wave-specialist",
    title: "Wave Pattern Specialist",
    description: "Deep dive into complex wave patterns and market structure",
    level: "intermediate",
    duration: "3 months",
    courses: [
      "wave-patterns",
      "market-structure",
      "pattern-trading",
      "wave-psychology",
    ],
    certification: true,
  },
  {
    id: "ai-trader",
    title: "AI-Enhanced Trading",
    description: "Combine Elliott Wave theory with artificial intelligence",
    level: "advanced",
    duration: "4 months",
    courses: ["ai-basics", "ml-patterns", "algo-trading", "ai-risk-management"],
    certification: true,
  },
];

export const courses: Course[] = [
  {
    id: "elliott-fundamentals",
    title: "Elliott Wave Fundamentals",
    description: "Master the basics of Elliott Wave Theory",
    duration: "4 weeks",
    level: "beginner",
    category: "fundamentals",
    progress: 0,
    tags: ["elliott-wave", "technical-analysis", "trading"],
    modules: [
      {
        id: "wave-basics",
        title: "Wave Basics",
        description: "Understanding the fundamental principles",
        progress: 0,
        lessons: [
          {
            id: "intro",
            title: "Introduction to Elliott Wave Theory",
            duration: "30min",
            completed: false,
            content:
              "Learn the core principles and history of Elliott Wave Theory",
          },
          {
            id: "wave-types",
            title: "Impulse vs Corrective Waves",
            duration: "45min",
            completed: false,
            content:
              "Understand the two main types of waves and their characteristics",
          },
        ],
      },
      {
        id: "wave-patterns",
        title: "Wave Patterns",
        description: "Identifying and trading wave patterns",
        progress: 0,
        lessons: [
          {
            id: "impulse-patterns",
            title: "Impulse Wave Patterns",
            duration: "1h",
            completed: false,
            content: "Learn to identify and trade impulse wave patterns",
          },
          {
            id: "corrective-patterns",
            title: "Corrective Wave Patterns",
            duration: "1h",
            completed: false,
            content: "Master corrective wave patterns and their variations",
          },
        ],
      },
    ],
  },
  {
    id: "advanced-wave-trading",
    title: "Advanced Wave Trading",
    description: "Advanced Elliott Wave trading strategies",
    duration: "6 weeks",
    level: "advanced",
    category: "strategies",
    progress: 0,
    tags: ["advanced", "trading-strategies", "risk-management"],
    modules: [
      {
        id: "complex-patterns",
        title: "Complex Wave Patterns",
        description: "Master complex wave formations",
        progress: 0,
        lessons: [
          {
            id: "triangles",
            title: "Triangle Patterns",
            duration: "1h",
            completed: false,
            content: "Understanding and trading triangle patterns",
          },
          {
            id: "combinations",
            title: "Wave Combinations",
            duration: "1h",
            completed: false,
            content: "Trading complex wave combinations",
          },
        ],
      },
    ],
  },
  {
    id: "elliott-basics",
    title: "Elliott Wave Fundamentals",
    description: "Essential knowledge for wave analysis",
    duration: "20 hours",
    level: "beginner",
    category: "fundamentals",
    progress: 0,
    tags: ["basics", "wave-theory", "market-structure"],
    modules: [
      {
        id: "wave-intro",
        title: "Introduction to Elliott Wave Theory",
        description: "Core concepts and principles",
        progress: 0,
        lessons: [
          {
            id: "what-is-ew",
            title: "What is Elliott Wave Theory?",
            duration: "30min",
            completed: false,
            content:
              "Introduction to the fundamental principles of Elliott Wave Theory and its application in financial markets.",
          },
          {
            id: "wave-basics",
            title: "Basic Wave Patterns",
            duration: "45min",
            completed: false,
            content:
              "Understanding impulse and corrective waves, their characteristics and identification.",
          },
          {
            id: "market-structure",
            title: "Market Structure",
            duration: "1h",
            completed: false,
            content:
              "How waves form market structure and create trading opportunities.",
          },
        ],
      },
      {
        id: "wave-patterns",
        title: "Wave Patterns and Rules",
        description: "Understanding different wave patterns",
        progress: 0,
        lessons: [
          {
            id: "impulse-waves",
            title: "Impulse Wave Patterns",
            duration: "1h",
            completed: false,
            content:
              "Detailed analysis of impulse wave patterns and their variations.",
          },
          {
            id: "corrective-waves",
            title: "Corrective Wave Patterns",
            duration: "1h",
            completed: false,
            content:
              "Understanding corrective waves and their complex variations.",
          },
        ],
      },
    ],
  },
  {
    id: "wave-patterns",
    title: "Advanced Wave Patterns",
    description: "Master complex wave patterns",
    duration: "30 hours",
    level: "intermediate",
    category: "technical-analysis",
    progress: 0,
    tags: ["patterns", "analysis", "trading"],
    modules: [
      {
        id: "complex-patterns",
        title: "Complex Wave Patterns",
        description: "Advanced pattern recognition",
        progress: 0,
        lessons: [
          {
            id: "diagonal-triangles",
            title: "Diagonal Triangles",
            duration: "1h",
            completed: false,
            content: "Understanding and trading diagonal triangle patterns.",
          },
          {
            id: "double-threes",
            title: "Double and Triple Threes",
            duration: "1h",
            completed: false,
            content: "Complex corrective patterns and their variations.",
          },
        ],
      },
    ],
  },
  {
    id: "ai-trading",
    title: "AI-Enhanced Wave Trading",
    description: "Combine AI with Elliott Wave analysis",
    duration: "40 hours",
    level: "advanced",
    category: "automation",
    progress: 0,
    tags: ["ai", "machine-learning", "automation"],
    modules: [
      {
        id: "ai-basics",
        title: "AI in Trading",
        description: "Introduction to AI-powered analysis",
        progress: 0,
        lessons: [
          {
            id: "ai-intro",
            title: "AI and Wave Analysis",
            duration: "1h",
            completed: false,
            content:
              "How AI enhances Elliott Wave analysis and trading decisions.",
          },
          {
            id: "pattern-recognition",
            title: "AI Pattern Recognition",
            duration: "1h",
            completed: false,
            content: "Using machine learning for wave pattern recognition.",
          },
        ],
      },
    ],
  },
];
