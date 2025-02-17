import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, TrendingUp, Brain } from "lucide-react";
import { gsap } from "gsap";

interface SearchResult {
  type: "pattern" | "signal" | "trade";
  title: string;
  description: string;
  confidence?: number;
}

export function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      // Mock search results - replace with actual API call
      const mockResults: SearchResult[] = [
        {
          type: "pattern",
          title: "Wave 3 Formation",
          description: "Strong bullish pattern detected on BTC/USD",
          confidence: 85,
        },
        {
          type: "signal",
          title: "Buy Signal",
          description: "AI recommends long position",
          confidence: 92,
        },
      ];
      setResults(mockResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.2 },
        );
      }
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patterns, signals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[300px] pl-8"
        />
      </div>

      {isOpen && results.length > 0 && (
        <Card
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full z-50 p-2"
        >
          <ScrollArea className="max-h-[300px]">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-2 hover:bg-muted rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {result.type === "pattern" ? (
                    <TrendingUp className="h-4 w-4 text-primary" />
                  ) : (
                    <Brain className="h-4 w-4 text-primary" />
                  )}
                  <div>
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}
