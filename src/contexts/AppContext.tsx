import React, { createContext, useContext, useReducer, useEffect } from "react";
import { api } from "@/lib/api-client";
import { wsManager as wsService } from "@/lib/websocket";
import { marketData } from "@/lib/market-data";
import type { Signal, MarketData, UserSettings } from "@/types/api";

type AppState = {
  signals: Signal[];
  marketData: Record<string, MarketData[]>;
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
};

type AppAction =
  | { type: "SET_SIGNALS"; payload: Signal[] }
  | { type: "ADD_SIGNAL"; payload: Signal }
  | {
      type: "UPDATE_MARKET_DATA";
      payload: { symbol: string; data: MarketData[] };
    }
  | { type: "SET_SETTINGS"; payload: UserSettings }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const defaultSettings: UserSettings = {
  trading: {
    defaultPositionSize: 1,
    riskPerTrade: 1,
    autoAdjustPosition: false,
    publicDataStream: true,
  },
  ai: {
    minConfidence: 75,
    patternSensitivity: "medium",
    autoUpdateModels: false,
  },
  notifications: {
    email: false,
    push: false,
    signals: false,
  },
  security: {
    twoFactorEnabled: false,
    apiKeys: [],
  },
  appearance: {
    theme: "system",
    chartStyle: "candlestick",
  },
};

const initialState: AppState = {
  signals: [],
  marketData: {},
  settings: defaultSettings,
  isLoading: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  loadMarketData: (symbol: string) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  loadMarketData: async () => {},
  updateSettings: async () => {},
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_SIGNALS":
      return { ...state, signals: action.payload };
    case "ADD_SIGNAL":
      return { ...state, signals: [...state.signals, action.payload] };
    case "UPDATE_MARKET_DATA":
      return {
        ...state,
        marketData: {
          ...state.marketData,
          [action.payload.symbol]: action.payload.data,
        },
      };
    case "SET_SETTINGS":
      return { ...state, settings: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Initialize WebSocket connection
    wsService.connect();

    // Subscribe to signals
    wsService.subscribe("signals", (signal) => {
      dispatch({ type: "ADD_SIGNAL", payload: signal });
    });

    // Load initial data
    loadInitialData();

    // Initialize market data
    marketData.enable();

    return () => {
      if (wsService && typeof wsService.disconnect === "function") {
        wsService.disconnect();
      }
      marketData.disable();
    };
  }, []);

  async function loadInitialData() {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Load user settings from localStorage or use defaults
      const savedSettings = localStorage.getItem("user_settings");
      if (savedSettings) {
        dispatch({ type: "SET_SETTINGS", payload: JSON.parse(savedSettings) });
      } else {
        dispatch({ type: "SET_SETTINGS", payload: defaultSettings });
      }

      // Load signals
      const signalsResponse = await api.getSignals();
      dispatch({ type: "SET_SIGNALS", payload: signalsResponse.data });

      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load initial data" });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function loadMarketData(symbol: string) {
    try {
      const response = await api.getMarketData(symbol, "1h");
      dispatch({
        type: "UPDATE_MARKET_DATA",
        payload: { symbol, data: response.data },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: `Failed to load market data for ${symbol}`,
      });
    }
  }

  async function updateSettings(newSettings: Partial<UserSettings>) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Merge with existing settings
      const mergedSettings = {
        ...state.settings,
        ...newSettings,
      };

      // Save to localStorage
      localStorage.setItem("user_settings", JSON.stringify(mergedSettings));

      // Update state
      dispatch({ type: "SET_SETTINGS", payload: mergedSettings });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to update settings" });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <AppContext.Provider
      value={{ state, dispatch, loadMarketData, updateSettings }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export const useApp = () => useContext(AppContext);
