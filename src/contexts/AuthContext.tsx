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
  const [state] = useState<AuthState>({
    // Initialize with mock user for development
    user: mockUser,
    session: { user: mockUser },
    isLoading: false,
    error: null,
  });

  // For development, we'll skip the actual auth
  const signIn = async () => {
    toast({
      title: "Development Mode",
      description: "Authentication is bypassed in development",
    });
  };

  const signUp = async () => {
    toast({
      title: "Development Mode",
      description: "Authentication is bypassed in development",
    });
  };

  const signOut = async () => {
    toast({
      title: "Development Mode",
      description: "Authentication is bypassed in development",
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
