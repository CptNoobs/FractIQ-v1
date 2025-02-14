import React, { createContext, useContext, useReducer } from "react";

interface TokenState {
  balance: number;
  transactions: Array<{
    id: string;
    type: "earn" | "spend";
    amount: number;
    description: string;
    timestamp: number;
  }>;
}

type TokenAction =
  | { type: "EARN_TOKENS"; payload: { amount: number; description: string } }
  | { type: "SPEND_TOKENS"; payload: { amount: number; description: string } };

const initialState: TokenState = {
  balance: 100, // Start with 100 WAVE tokens
  transactions: [],
};

const TokenContext = createContext<{
  state: TokenState;
  earnTokens: (amount: number, description: string) => void;
  spendTokens: (amount: number, description: string) => boolean;
}>({ state: initialState, earnTokens: () => {}, spendTokens: () => false });

function tokenReducer(state: TokenState, action: TokenAction): TokenState {
  switch (action.type) {
    case "EARN_TOKENS":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        transactions: [
          {
            id: crypto.randomUUID(),
            type: "earn",
            amount: action.payload.amount,
            description: action.payload.description,
            timestamp: Date.now(),
          },
          ...state.transactions,
        ],
      };
    case "SPEND_TOKENS":
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        transactions: [
          {
            id: crypto.randomUUID(),
            type: "spend",
            amount: action.payload.amount,
            description: action.payload.description,
            timestamp: Date.now(),
          },
          ...state.transactions,
        ],
      };
    default:
      return state;
  }
}

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tokenReducer, initialState);

  const earnTokens = (amount: number, description: string) => {
    dispatch({ type: "EARN_TOKENS", payload: { amount, description } });
  };

  const spendTokens = (amount: number, description: string): boolean => {
    if (state.balance < amount) return false;
    dispatch({ type: "SPEND_TOKENS", payload: { amount, description } });
    return true;
  };

  return (
    <TokenContext.Provider value={{ state, earnTokens, spendTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokens must be used within a TokenProvider");
  }
  return context;
};
