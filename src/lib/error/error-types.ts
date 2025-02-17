export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export type ErrorCategory =
  | "api"
  | "auth"
  | "network"
  | "validation"
  | "runtime"
  | "business"
  | "unknown";

export interface ErrorMetadata {
  code?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: number;
  context?: Record<string, any>;
}

export class AppError extends Error {
  metadata: ErrorMetadata;

  constructor(message: string, metadata: Partial<ErrorMetadata> = {}) {
    super(message);
    this.name = "AppError";
    this.metadata = {
      severity: metadata.severity || "medium",
      category: metadata.category || "unknown",
      timestamp: Date.now(),
      code: metadata.code,
      context: metadata.context,
    };
  }
}
