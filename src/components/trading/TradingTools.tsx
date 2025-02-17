import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PositionCalculator } from "./PositionCalculator";
import { RiskCalculator } from "./RiskCalculator";

export function TradingTools() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trading Tools</h1>
      <Tabs defaultValue="position" className="space-y-4">
        <TabsList>
          <TabsTrigger value="position">Position Calculator</TabsTrigger>
          <TabsTrigger value="risk">Risk Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="position">
          <PositionCalculator />
        </TabsContent>

        <TabsContent value="risk">
          <RiskCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
