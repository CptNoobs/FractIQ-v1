import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Newspaper, TrendingUp, TrendingDown, Brain } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
  impact: number;
  aiAnalysis: string;
}

export function NewsPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Major Protocol Upgrade Announced",
      source: "CryptoNews",
      timestamp: new Date().toISOString(),
      sentiment: "positive",
      impact: 85,
      aiAnalysis: "Likely to drive positive price action in short term",
    },
    // Add more news items
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Market News</h3>
        </div>
        <Badge variant="outline">AI Analyzed</Badge>
      </div>

      <Input
        placeholder="Search news..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.sentiment === "positive" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : item.sentiment === "negative" ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="font-medium">{item.title}</span>
                </div>
                <Badge
                  variant={
                    item.sentiment === "positive" ? "default" : "destructive"
                  }
                >
                  {item.impact}% Impact
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                <span>{item.source}</span>
                <span>•</span>
                <span>{new Date(item.timestamp).toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-primary" />
                <span>{item.aiAnalysis}</span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
