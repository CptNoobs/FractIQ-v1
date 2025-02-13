import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const api = {
  // Auth
  login: (credentials: { email: string; password: string }) =>
    apiClient.post("/auth/login", credentials),
  register: (userData: { email: string; password: string; name: string }) =>
    apiClient.post("/auth/register", userData),
  refreshToken: () => apiClient.post("/auth/refresh"),

  // Market Data
  getMarketData: (symbol: string, timeframe: string) =>
    apiClient.get(`/market-data/${symbol}/${timeframe}`),
  getWatchlist: () => apiClient.get("/watchlist"),
  addToWatchlist: (symbol: string) => apiClient.post("/watchlist", { symbol }),
  removeFromWatchlist: (symbol: string) =>
    apiClient.delete(`/watchlist/${symbol}`),

  // Trading
  getSignals: () => apiClient.get("/signals"),
  executeSignal: (signalId: string) =>
    apiClient.post(`/signals/${signalId}/execute`),
  getRiskParameters: (signalId: string) =>
    apiClient.get(`/signals/${signalId}/risk`),

  // Analysis
  analyzePattern: (symbol: string, timeframe: string) =>
    apiClient.post("/analysis/pattern", { symbol, timeframe }),
  getAIInsights: (symbol: string) =>
    apiClient.get(`/analysis/insights/${symbol}`),

  // User Settings
  updateSettings: (settings: any) => apiClient.put("/settings", settings),
  getSettings: () => apiClient.get("/settings"),
};
