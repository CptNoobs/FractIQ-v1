import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LegalDocs() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Legal Documentation</h1>

      <Tabs defaultValue="terms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="risk">Risk Disclosure</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <Card className="p-6">
          <ScrollArea className="h-[600px]">
            <TabsContent value="terms">
              <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
              {/* Add Terms of Service content */}
            </TabsContent>

            <TabsContent value="privacy">
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              {/* Add Privacy Policy content */}
            </TabsContent>

            <TabsContent value="risk">
              <h2 className="text-2xl font-bold mb-4">Risk Disclosure</h2>
              {/* Add Risk Disclosure content */}
            </TabsContent>

            <TabsContent value="compliance">
              <h2 className="text-2xl font-bold mb-4">Compliance</h2>
              {/* Add Compliance content */}
            </TabsContent>
          </ScrollArea>
        </Card>
      </Tabs>
    </div>
  );
}
