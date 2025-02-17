import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type AuthMode = "signin" | "signup" | "reset";

export function AuthForm() {
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword, isLoading, error } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name } = formData;

    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else if (mode === "signup") {
        await signUp(email, password, name);
      } else if (mode === "reset") {
        await resetPassword(email);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleGuestAccess = async () => {
    try {
      await signIn("guest@example.com", "guestpassword");
      toast({
        title: "Guest Access",
        description: "Continuing as guest user",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Guest access is currently unavailable",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">
            {mode === "signin"
              ? "Welcome Back"
              : mode === "signup"
                ? "Create Account"
                : "Reset Password"}
          </h2>
          <p className="text-muted-foreground">
            {mode === "signin"
              ? "Sign in to access your account"
              : mode === "signup"
                ? "Sign up to get started"
                : "Enter your email to reset password"}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {mode !== "reset" && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          )}
        </div>

        <Button className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "signin"
            ? "Sign In"
            : mode === "signup"
              ? "Sign Up"
              : "Reset Password"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGuestAccess}
        >
          Continue as Guest
        </Button>

        <div className="text-center space-y-2">
          {mode === "signin" ? (
            <>
              <Button
                variant="link"
                className="text-xs"
                onClick={() => setMode("reset")}
              >
                Forgot password?
              </Button>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </Button>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setMode("signin")}
              >
                Sign in
              </Button>
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
