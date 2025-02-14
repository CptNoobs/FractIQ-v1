import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import { Settings } from "lucide-react";
import { memo } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/ui/nav";
import routes from "tempo-routes";
import Main from "./components/main";
import Analysis from "./components/analysis";
import Learn from "./components/learn";
import Insights from "./components/insights";
import SettingsPage from "./components/settings";
import { AuthForm } from "./components/auth/AuthForm";
import { TokenPage } from "./components/token/TokenPage";
import { Toaster } from "@/components/ui/toaster";
import { AIJournal } from "./components/journal/AIJournal";
import Landing from "./components/landing";
import { PrivateRoute } from "./components/PrivateRoute";

import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TokenProvider } from "@/contexts/TokenContext";

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {user && (
        <header className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="flex h-14 items-center px-4">
            <Nav />
          </div>
        </header>
      )}

      <main className={user ? "pt-14" : ""}>
        <Toaster />
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/tokens" element={<TokenPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <PrivateRoute>
                <Analysis />
              </PrivateRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <PrivateRoute>
                <Learn />
              </PrivateRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <PrivateRoute>
                <Insights />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <PrivateRoute>
                <AIJournal />
              </PrivateRoute>
            }
          />
          <Route
            path="/tokens"
            element={
              <PrivateRoute>
                <TokenPage />
              </PrivateRoute>
            }
          />

          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </main>
    </div>
  );
};

const App = memo(() => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <AuthProvider>
        <TokenProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </TokenProvider>
      </AuthProvider>
    </ThemeProvider>
  );
});

export default App;
