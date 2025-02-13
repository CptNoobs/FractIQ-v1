import { Routes, Route, Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import routes from "tempo-routes";
import Home from "./components/home";
import Landing from "./components/landing";
import Main from "./components/main";
import Analysis from "./components/analysis";
import Learn from "./components/learn";
import Insights from "./components/insights";
import Settings from "./components/settings";
import { AuthForm } from "./components/auth/AuthForm";
import { Toaster } from "@/components/ui/toaster";

import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="flex h-14 items-center px-4 gap-4">
          <a href="/main" className="font-bold text-xl">
            Elliott Wave AI
          </a>
          <nav className="flex-1 flex items-center justify-end gap-2">
            <a href="/main" className="px-4 py-2 hover:bg-accent rounded-md">
              Home
            </a>
            <a
              href="/dashboard"
              className="px-4 py-2 hover:bg-accent rounded-md"
            >
              Dashboard
            </a>
            <a
              href="/analysis"
              className="px-4 py-2 hover:bg-accent rounded-md"
            >
              Analysis
            </a>
            <a
              href="/insights"
              className="px-4 py-2 hover:bg-accent rounded-md"
            >
              Insights
            </a>
            <a href="/learn" className="px-4 py-2 hover:bg-accent rounded-md">
              Learn
            </a>
            <a
              href="/settings"
              className="px-4 py-2 hover:bg-accent rounded-md"
            >
              Settings
            </a>
          </nav>
        </div>
      </header>
      <main className="pt-14">{children}</main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Toaster />
            {/* Tempo routes */}
            {import.meta.env.VITE_TEMPO && useRoutes(routes)}

            <Routes>
              <Route path="/" element={<Navigate to="/main" replace />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/main" element={<Main />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />

              {/* Add this before any catchall route */}
              {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
            </Routes>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
