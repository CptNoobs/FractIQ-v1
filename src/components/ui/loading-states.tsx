import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return <Loader2 className={`animate-spin ${className}`} />;
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner className="h-8 w-8 text-primary" />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <LoadingSpinner className="h-8 w-8 text-primary" />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="flex h-32 items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm">
      <LoadingSpinner className="h-6 w-6 text-primary" />
    </div>
  );
}
