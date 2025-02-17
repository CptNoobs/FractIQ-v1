import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const createMockClient = () =>
  ({
    auth: {
      getSession: () =>
        Promise.resolve({
          data: {
            session: {
              user: {
                id: "mock-user-id",
                email: "demo@example.com",
                user_metadata: {
                  name: "Demo User",
                  avatar_url:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
                },
              },
            },
          },
          error: null,
        }),
      onAuthStateChange: (callback: any) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
      signInWithPassword: () =>
        Promise.resolve({
          data: {
            user: {
              id: "mock-user-id",
              email: "demo@example.com",
              user_metadata: {
                name: "Demo User",
                avatar_url:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
              },
            },
            session: {
              user: {
                id: "mock-user-id",
                email: "demo@example.com",
                user_metadata: {
                  name: "Demo User",
                  avatar_url:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
                },
              },
            },
          },
          error: null,
        }),
      signUp: () =>
        Promise.resolve({
          data: {
            user: {
              id: "mock-user-id",
              email: "demo@example.com",
              user_metadata: {
                name: "Demo User",
              },
            },
            session: null,
          },
          error: null,
        }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: null }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
    }),
  }) as any;

const initSupabase = () => {
  // In development without Supabase credentials, return mock client
  if (
    !import.meta.env.VITE_SUPABASE_URL ||
    !import.meta.env.VITE_SUPABASE_ANON_KEY
  ) {
    console.warn("Supabase credentials not found, using mock client");
    return createMockClient();
  }

  // For production or when credentials are provided
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

export const supabase = initSupabase();

// Re-export types
export type { Tables } from "@/types/supabase";
