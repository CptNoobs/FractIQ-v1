class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();
  private reconnectTimeout: number | null = null;

  connect() {
    try {
      // For development, we'll mock the WebSocket
      // In production, replace with your actual WebSocket endpoint
      console.log("Mocking WebSocket connection for development");
      this.mockWebSocket();
    } catch (error) {
      console.error("WebSocket connection error:", error);
    }
  }

  private mockWebSocket() {
    // Simulate WebSocket behavior for development
    this.ws = {
      readyState: WebSocket.OPEN,
      send: (data: string) => {
        console.log("Mock WebSocket send:", data);
      },
      close: () => {
        console.log("Mock WebSocket closed");
        this.ws = null;
      },
    } as WebSocket;

    // Simulate periodic market data updates
    setInterval(() => {
      this.mockMarketDataUpdate();
    }, 1000);
  }

  private mockMarketDataUpdate() {
    const mockData = {
      type: "market_data",
      symbol: "BTCUSDT",
      price: 45000 + Math.random() * 1000,
      time: new Date().toISOString(),
      volume: 1000000 + Math.random() * 500000,
    };

    const subscribers = this.subscribers.get("market_data");
    if (subscribers) {
      subscribers.forEach((callback) => callback(mockData));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    this.subscribers.clear();
    this.reconnectAttempts = 0;
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type)?.add(callback);
  }

  unsubscribe(type: string, callback: (data: any) => void) {
    this.subscribers.get(type)?.delete(callback);
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

export const wsManager = new WebSocketManager();
export const wsService = wsManager; // Add backward compatibility export
