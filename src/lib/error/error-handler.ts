import { AppError, ErrorCategory, ErrorMetadata } from "./error-types";
import { toast } from "@/components/ui/use-toast";

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorCallbacks: Map<ErrorCategory, ((error: AppError) => void)[]>;
  private errorLog: AppError[] = [];
  private readonly MAX_LOG_SIZE = 100;

  private constructor() {
    this.errorCallbacks = new Map();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  onError(
    category: ErrorCategory,
    callback: (error: AppError) => void,
  ): () => void {
    if (!this.errorCallbacks.has(category)) {
      this.errorCallbacks.set(category, []);
    }
    this.errorCallbacks.get(category)?.push(callback);

    return () => {
      const callbacks = this.errorCallbacks.get(category);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  handleError(
    error: Error | AppError,
    metadata: Partial<ErrorMetadata> = {},
  ): void {
    const appError =
      error instanceof AppError ? error : new AppError(error.message, metadata);

    // Log error
    console.error(
      `[${appError.metadata.category.toUpperCase()}][${appError.metadata.severity}]`,
      appError.message,
      appError.metadata,
    );

    // Store in error log
    this.errorLog.unshift(appError);
    if (this.errorLog.length > this.MAX_LOG_SIZE) {
      this.errorLog.pop();
    }

    // Notify callbacks
    this.errorCallbacks
      .get(appError.metadata.category)
      ?.forEach((callback) => callback(appError));

    // Show toast for user-facing errors
    if (
      appError.metadata.severity === "high" ||
      appError.metadata.severity === "critical"
    ) {
      toast({
        title: "Error",
        description: appError.message,
        variant: "destructive",
      });
    }

    // Report critical errors
    if (appError.metadata.severity === "critical") {
      // TODO: Add error reporting service integration
      console.error("Critical error:", appError);
    }
  }

  getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }
}

export const errorHandler = ErrorHandler.getInstance();
