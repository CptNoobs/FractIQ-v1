import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { errorHandler } from "@/lib/error/error-handler";
import { AppError } from "@/lib/error/error-types";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Handle error through error handler
    errorHandler.handleError(error, {
      category: "runtime",
      severity: "high",
      context: { errorInfo },
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="flex gap-4">
              <Button onClick={this.handleRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <Home className="h-4 w-4" /> Go Home
                </Button>
              </Link>
            </div>
            {process.env.NODE_ENV === "development" && this.state.errorInfo && (
              <div className="mt-6 text-left w-full max-w-2xl mx-auto">
                <details className="bg-muted/50 p-4 rounded-lg">
                  <summary className="cursor-pointer font-medium mb-2">
                    Error Details
                  </summary>
                  <pre className="text-xs overflow-auto p-4 bg-background rounded">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}
