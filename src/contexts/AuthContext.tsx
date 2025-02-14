import { createContext, useContext, useState } from "react";
import type { AuthState, AuthUser } from "@/types/auth";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: AuthUser = {
  id: "dev-user",
  email: "dev@example.com",
  name: "Developer",
  created_at: new Date().toISOString(),
  subscription_tier: "pro",
  subscription_status: "active",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: false,
    error: null,
  });

  // For development, we'll skip the actual auth
  const signIn = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      // In production, this would call your auth API
      if (email === "demo@example.com" && password === "demo123") {
        const user = {
          id: "demo-user",
          email,
          name: "Demo User",
          created_at: new Date().toISOString(),
          subscription_tier: "pro",
          subscription_status: "active",
        };
        setState({
          user,
          session: { user },
          isLoading: false,
          error: null,
        });
        toast({
          title: "Welcome back!",
          description: "Successfully signed in",
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: "Invalid email or password",
      });
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const signUp = async () => {
    toast({
      title: "Development Mode",
      description: "Authentication is bypassed in development",
    });
  };

  const signOut = async () => {
    setState({
      user: null,
      session: null,
      isLoading: false,
      error: null,
    });
    toast({
      title: "Signed out",
      description: "Successfully signed out",
    });
  };

  const resetPassword = async () => {
    toast({
      title: "Development Mode",
      description: "Authentication is bypassed in development",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
