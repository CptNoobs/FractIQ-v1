import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock WebSocket
class MockWebSocket {
  onopen: () => void = () => {};
  onclose: () => void = () => {};
  onmessage: (data: any) => void = () => {};
  onerror: (error: any) => void = () => {};
  readyState = WebSocket.OPEN;

  constructor() {
    setTimeout(() => this.onopen(), 0);
  }

  send(data: string) {
    console.log("MockWebSocket send:", data);
  }

  close() {
    this.onclose();
  }
}

global.WebSocket = MockWebSocket as any;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
