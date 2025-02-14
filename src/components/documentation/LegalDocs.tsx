import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Shield, Scale } from "lucide-react";

const documents = [
  {
    title: "Terms of Service",
    description: "Our terms and conditions for using the platform",
    icon: <FileText className="h-5 w-5" />,
    lastUpdated: "2024-03-15",
  },
  {
    title: "Privacy Policy",
    description: "How we handle and protect your data",
    icon: <Shield className="h-5 w-5" />,
    lastUpdated: "2024-03-15",
  },
  {
    title: "Risk Disclosure",
    description: "Important information about trading risks",
    icon: <Scale className="h-5 w-5" />,
    lastUpdated: "2024-03-15",
  },
];

export function LegalDocs() {
  return (
    <ScrollArea className="h-[500px] w-full pr-4">
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">{doc.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-muted-foreground mt-1">{doc.description}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Last updated: {doc.lastUpdated}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
