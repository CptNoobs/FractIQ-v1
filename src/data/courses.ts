import { Course, LearningPath } from "@/types/course";

export const learningPaths: LearningPath[] = [
  {
    id: "complete-trader",
    title: "Complete Trader Path",
    description:
      "Comprehensive journey from basics to advanced trading strategies",
    level: "beginner",
    duration: "6 months",
    courses: [
      "trading-101",
      "technical-analysis",
      "risk-management",
      "psychology-101",
      "advanced-strategies",
    ],
    certification: true,
  },
  {
    id: "technical-analyst",
    title: "Technical Analysis Specialist",
    description: "Master technical analysis and chart patterns",
    level: "intermediate",
    duration: "3 months",
    courses: [
      "technical-analysis",
      "elliott-wave",
      "advanced-patterns",
      "market-structure",
    ],
    certification: true,
  },
  {
    id: "algo-trader",
    title: "Algorithmic Trading",
    description: "Learn to automate your trading strategies",
    level: "advanced",
    duration: "4 months",
    courses: [
      "programming-basics",
      "algo-trading-101",
      "machine-learning",
      "strategy-automation",
    ],
    certification: true,
  },
];

export const courses: Course[] = [
  {
    id: "trading-101",
    title: "Trading Fundamentals",
    description: "Essential knowledge for beginning traders",
    duration: "20 hours",
    level: "beginner",
    category: "fundamentals",
    progress: 0,
    tags: ["basics", "terminology", "market-structure"],
    modules: [
      {
        id: "markets-101",
        title: "Understanding Financial Markets",
        description: "Introduction to different markets and how they work",
        progress: 0,
        lessons: [
          {
            id: "what-is-trading",
            title: "What is Trading?",
            duration: "30min",
            completed: false,
            content: "Introduction to trading concepts...",
          },
        ],
      },
    ],
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis Foundations",
    description: "Learn to read and analyze price charts",
    duration: "30 hours",
    level: "beginner",
    category: "technical-analysis",
    progress: 0,
    tags: ["charts", "patterns", "indicators"],
    modules: [
      {
        id: "chart-basics",
        title: "Chart Basics",
        description: "Understanding different types of charts",
        progress: 0,
        lessons: [
          {
            id: "candlestick-patterns",
            title: "Candlestick Patterns",
            duration: "45min",
            completed: false,
            content: "Understanding candlestick patterns...",
          },
        ],
      },
    ],
  },
  {
    id: "risk-management",
    title: "Risk Management Mastery",
    description: "Learn to protect your capital and manage risk",
    duration: "15 hours",
    level: "beginner",
    category: "risk-management",
    progress: 0,
    tags: ["risk", "money-management", "position-sizing"],
    modules: [
      {
        id: "risk-basics",
        title: "Risk Management Fundamentals",
        description: "Understanding risk and reward",
        progress: 0,
        lessons: [
          {
            id: "position-sizing",
            title: "Position Sizing",
            duration: "40min",
            completed: false,
            content: "Learn proper position sizing...",
          },
        ],
      },
    ],
  },
  // Add more courses...
];
