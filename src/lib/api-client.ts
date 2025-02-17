import axios from "axios";
import type { Signal, MarketData, UserSettings } from "@/types/api";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.tempolabs.ai";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const apiClient = {
  // Auth
  signIn: (email: string, password: string) =>
    api.post("/auth/signin", { email, password }),
  signUp: (email: string, password: string, name: string) =>
    api.post("/auth/signup", { email, password, name }),
  resetPassword: (email: string) => api.post("/auth/reset-password", { email }),

  // Market Data
  getMarketData: (symbol: string, timeframe: string) =>
    api.get<MarketData[]>(`/market-data/${symbol}?timeframe=${timeframe}`),
  getSignals: () => api.get<Signal[]>("/signals"),

  // User Settings
  getUserSettings: () => api.get<UserSettings>("/settings"),
  updateUserSettings: (settings: Partial<UserSettings>) =>
    api.patch("/settings", settings),

  // Trading
  executeTrade: (symbol: string, type: "buy" | "sell", amount: number) =>
    api.post("/trades/execute", { symbol, type, amount }),
  getTrades: () => api.get("/trades"),

  // AI Analysis
  getPatternAnalysis: (symbol: string) =>
    api.get(`/analysis/pattern/${symbol}`),
  getTechnicalAnalysis: (symbol: string) =>
    api.get(`/analysis/technical/${symbol}`),
  getAIInsights: (symbol: string) => api.get(`/analysis/insights/${symbol}`),

  // Journal
  getJournalEntries: () => api.get("/journal/entries"),
  addJournalEntry: (entry: any) => api.post("/journal/entries", entry),

  // Token
  getTokenBalance: () => api.get("/token/balance"),
  stakeTokens: (amount: number, duration: number) =>
    api.post("/token/stake", { amount, duration }),
  unstakeTokens: (amount: number) => api.post("/token/unstake", { amount }),
};

export { api };
