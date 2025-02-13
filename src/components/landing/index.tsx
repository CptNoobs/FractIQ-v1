import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Cpu, Network, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { GeometricBackground } from "@/components/ui/geometric-background";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GeometricBackground />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              AI-Powered Elliott Wave Trading
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Advanced ML algorithms analyze Elliott Wave fractals across
              multiple timeframes to identify precise entry and exit points. Our
              AI system processes complex market patterns to deliver
              high-confidence trading signals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">AI-Powered Analysis</h2>
            <p className="mt-4 text-muted-foreground">
              State-of-the-art machine learning for precise market analysis
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
              <Brain className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">ML Analysis</h3>
              <p className="text-muted-foreground">
                Advanced pattern recognition across multiple timeframes
              </p>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
              <Network className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Fractal Detection</h3>
              <p className="text-muted-foreground">
                Identify complex Elliott Wave patterns and market fractals
              </p>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
              <Zap className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Sniper Entries</h3>
              <p className="text-muted-foreground">
                Precise entry and exit points with confidence scoring
              </p>
            </Card>

            <Card className="p-6 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
              <Cpu className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Real-time AI</h3>
              <p className="text-muted-foreground">
                Continuous market monitoring and instant signal generation
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
