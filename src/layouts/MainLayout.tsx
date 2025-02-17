import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "@/components/ui/nav";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { wsManager } from "@/lib/websocket";
import { marketData } from "@/lib/market-data";

export function MainLayout() {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize WebSocket and market data
    wsManager.connect();
    marketData.enable();

    return () => {
      wsManager.disconnect();
      marketData.disable();
    };
  }, []);

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
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}
