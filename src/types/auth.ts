export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  subscription_tier?: "free" | "pro" | "enterprise";
  subscription_status?: "active" | "trialing" | "past_due" | "canceled";
}

export interface AuthState {
  user: AuthUser | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
}
