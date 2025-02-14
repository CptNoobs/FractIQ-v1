import { toast } from "@/components/ui/use-toast";

class NotificationService {
  private static _instance: NotificationService | null = null;
  private subscriptions = new Map<string, Set<(data: any) => void>>();

  private constructor() {
    this.initializeNotifications();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService._instance) {
      NotificationService._instance = new NotificationService();
    }
    return NotificationService._instance;
  }

  private async initializeNotifications() {
    await this.requestPermission();
    this.setupServiceWorker();
  }

  private async setupServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          type: "module",
        });
        console.log("ServiceWorker registered:", registration);
      } catch (error) {
        console.error("ServiceWorker registration failed:", error);
      }
    }
  }

  async requestPermission() {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }

  notify(
    title: string,
    message: string,
    type: "success" | "warning" | "info" = "info",
    options: NotificationOptions = {},
  ) {
    toast({
      title,
      description: message,
      variant: type === "warning" ? "destructive" : "default",
    });

    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(title, {
        body: message,
        icon: "/path/to/icon.png",
        badge: "/path/to/badge.png",
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  async notifyTradeInsight(
    insight: string,
    importance: "high" | "medium" | "low",
    data?: any,
  ) {
    const type = importance === "high" ? "warning" : "info";

    this.notify("Trade Insight", insight, type, {
      tag: "trade-insight",
      data,
      actions: [
        { action: "view", title: "View Details" },
        { action: "dismiss", title: "Dismiss" },
      ],
    });

    this.notifySubscribers("trade-insight", { insight, importance, data });
  }

  async notifyPatternDetected(
    pattern: string,
    symbol: string,
    confidence: number,
  ) {
    if (confidence >= 80) {
      this.notify(
        "High Confidence Pattern Detected",
        `${pattern} detected on ${symbol} with ${confidence}% confidence`,
        "info",
        {
          tag: "pattern-detection",
          data: { pattern, symbol, confidence },
          requireInteraction: true,
        },
      );
    }
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set());
    }
    this.subscriptions.get(event)?.add(callback);

    return () => {
      this.subscriptions.get(event)?.delete(callback);
    };
  }

  private notifySubscribers(event: string, data: any) {
    this.subscriptions.get(event)?.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error("Error in notification subscriber:", error);
      }
    });
  }
}

export const notifications = NotificationService.getInstance();
