export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
          settings: Json;
        };
        Insert: {
          id: string;
          email: string;
          name?: string;
          created_at?: string;
          settings?: Json;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
          settings?: Json;
        };
      };
      trades: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          type: "buy" | "sell";
          entry_price: number;
          exit_price: number;
          quantity: number;
          status: "open" | "closed";
          created_at: string;
          closed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          symbol: string;
          type: "buy" | "sell";
          entry_price: number;
          exit_price?: number;
          quantity: number;
          status: "open" | "closed";
          created_at?: string;
          closed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          symbol?: string;
          type?: "buy" | "sell";
          entry_price?: number;
          exit_price?: number;
          quantity?: number;
          status?: "open" | "closed";
          created_at?: string;
          closed_at?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          trade_id: string;
          notes: string;
          sentiment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          trade_id: string;
          notes: string;
          sentiment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          trade_id?: string;
          notes?: string;
          sentiment?: string;
          created_at?: string;
        };
      };
      signals: {
        Row: {
          id: string;
          symbol: string;
          type: "buy" | "sell";
          price: number;
          confidence: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          symbol: string;
          type: "buy" | "sell";
          price: number;
          confidence: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          symbol?: string;
          type?: "buy" | "sell";
          price?: number;
          confidence?: number;
          created_at?: string;
        };
      };
      token_transactions: {
        Row: {
          id: string;
          user_id: string;
          type: "earn" | "spend" | "stake" | "unstake";
          amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "earn" | "spend" | "stake" | "unstake";
          amount: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: "earn" | "spend" | "stake" | "unstake";
          amount?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
