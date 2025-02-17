import { Routes, Route, Navigate } from "react-router-dom";
import { memo } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { MainLayout } from "@/layouts/MainLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ModernDashboard } from "@/components/dashboard/ModernDashboard";
import Analysis from "@/components/analysis";
import Learn from "@/components/learn";
import Insights from "@/components/insights";
import SettingsPage from "@/components/settings";
import { AuthForm } from "@/components/auth/AuthForm";
import { TokenPage } from "@/components/token/TokenPage";
import { Tokenomics } from "@/components/token/Tokenomics";
import { PricingPage } from "@/components/premium/PricingPage";
import Journal from "@/components/journal";
import Landing from "@/components/landing";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import Patterns from "@/components/patterns";
import { TradingTools } from "@/components/trading/TradingTools";
import { MarketScanner } from "@/components/market/MarketScanner";
import { NewsPanel } from "@/components/trading/NewsPanel";
import { SocialTrading } from "@/components/trading/SocialTrading";
import { BacktestingModule } from "@/components/trading/BacktestingModule";
import { AIJournal } from "@/components/journal/AIJournal";

import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { TokenProvider } from "@/contexts/TokenContext";

import { ErrorBoundary } from "@/lib/error-boundary";

const TempoRoutes = () => {
  const tempoRoutes = useRoutes(routes);
  return tempoRoutes;
};

const AppRoutes = () => {
  return (
    <>
      {import.meta.env.VITE_TEMPO && <TempoRoutes />}
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <AuthForm />
              </PublicRoute>
            }
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/tokenomics" element={<Tokenomics />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<ModernDashboard />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="patterns" element={<Patterns />} />
            <Route path="learn" element={<Learn />} />
            <Route path="insights" element={<Insights />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="journal" element={<AIJournal />} />
            <Route path="tokens" element={<TokenPage />} />
            <Route path="trading" element={<TradingTools />} />
            <Route path="scanner" element={<MarketScanner />} />
            <Route path="news" element={<NewsPanel />} />
            <Route path="social" element={<SocialTrading />} />
            <Route path="backtest" element={<BacktestingModule />} />
          </Route>

          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

const App = memo(() => {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <AuthProvider>
          <TokenProvider>
            <AppProvider>
              <AppRoutes />
            </AppProvider>
          </TokenProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
});

export default App;
