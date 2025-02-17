export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL as string,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  API_URL: import.meta.env.VITE_API_URL as string,
  IS_TEMPO: import.meta.env.VITE_TEMPO === "true",
  BINANCE_API_KEY: import.meta.env.VITE_BINANCE_API_KEY as string,
  BINANCE_API_SECRET: import.meta.env.VITE_BINANCE_API_SECRET as string,
  ENABLE_REAL_TRADING: import.meta.env.VITE_ENABLE_REAL_TRADING === "true",
  ENABLE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_NOTIFICATIONS === "true",
  ENABLE_AI_FEATURES: import.meta.env.VITE_ENABLE_AI_FEATURES === "true",

  // Validation
  validate() {
    const required = ["SUPABASE_URL", "SUPABASE_ANON_KEY", "API_URL"];
    const missing = required.filter((key) => !this[key as keyof typeof env]);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(", ")}`,
      );
    }
  },
};
