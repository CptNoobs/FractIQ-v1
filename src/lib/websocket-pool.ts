class WebSocketPool {
  private static instance: WebSocketPool;
  private connections: Map<string, WebSocket> = new Map();
  private maxRetries = 3;
  private retryDelays = [1000, 3000, 5000];

  private constructor() {}

  static getInstance(): WebSocketPool {
    if (!WebSocketPool.instance) {
      WebSocketPool.instance = new WebSocketPool();
    }
    return WebSocketPool.instance;
  }

  connect(
    url: string,
    options: {
      onMessage?: (data: any) => void;
      onError?: (error: Event) => void;
      onClose?: () => void;
    } = {},
  ): WebSocket {
    if (this.connections.has(url)) {
      return this.connections.get(url)!;
    }

    const ws = new WebSocket(url);
    let retryCount = 0;

    const handleOpen = () => {
      console.log(`WebSocket connected: ${url}`);
      retryCount = 0;
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        options.onMessage?.(data);
      } catch (error) {
        console.error("WebSocket message parse error:", error);
      }
    };

    const handleError = (event: Event) => {
      console.error(`WebSocket error: ${url}`, event);
      options.onError?.(event);
    };

    const handleClose = () => {
      console.log(`WebSocket closed: ${url}`);
      this.connections.delete(url);
      options.onClose?.();

      if (retryCount < this.maxRetries) {
        const delay = this.retryDelays[retryCount];
        console.log(`Retrying connection in ${delay}ms...`);
        setTimeout(() => {
          retryCount++;
          this.connect(url, options);
        }, delay);
      }
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", handleError);
    ws.addEventListener("close", handleClose);

    this.connections.set(url, ws);
    return ws;
  }

  disconnect(url: string) {
    const ws = this.connections.get(url);
    if (ws) {
      ws.close();
      this.connections.delete(url);
    }
  }

  disconnectAll() {
    this.connections.forEach((ws, url) => {
      ws.close();
      this.connections.delete(url);
    });
  }

  send(url: string, data: any) {
    const ws = this.connections.get(url);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }
}

export const wsPool = WebSocketPool.getInstance();
