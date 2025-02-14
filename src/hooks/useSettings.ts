import { useApp } from "@/contexts/AppContext";
import { marketData } from "@/lib/market-data";
import { UserSettings } from "@/types/api";
import { useCallback } from "react";

export function useSettings() {
  const { state, updateSettings } = useApp();

  const saveSettings = useCallback(
    async (newSettings: Partial<UserSettings>) => {
      try {
        // Apply market data stream setting immediately
        if (newSettings.trading?.publicDataStream !== undefined) {
          if (newSettings.trading.publicDataStream) {
            marketData.enable();
          } else {
            marketData.disable();
          }
        }

        await updateSettings(newSettings);
        return true;
      } catch (error) {
        console.error("Failed to save settings:", error);
        return false;
      }
    },
    [updateSettings],
  );

  return {
    settings: state.settings,
    isLoading: state.isLoading,
    error: state.error,
    saveSettings,
  };
}
