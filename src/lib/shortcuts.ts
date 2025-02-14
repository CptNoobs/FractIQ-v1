import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Shortcut = {
  key: string;
  description: string;
  action: () => void;
};

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts: Shortcut[] = [
    { key: "g h", description: "Go to Home", action: () => navigate("/main") },
    {
      key: "g d",
      description: "Go to Dashboard",
      action: () => navigate("/dashboard"),
    },
    {
      key: "g a",
      description: "Go to Analysis",
      action: () => navigate("/analysis"),
    },
    {
      key: "g i",
      description: "Go to Insights",
      action: () => navigate("/insights"),
    },
    {
      key: "g l",
      description: "Go to Learn",
      action: () => navigate("/learn"),
    },
    {
      key: "g j",
      description: "Go to Journal",
      action: () => navigate("/journal"),
    },
    {
      key: "g s",
      description: "Go to Settings",
      action: () => navigate("/settings"),
    },
    {
      key: "?",
      description: "Show Keyboard Shortcuts",
      action: () => showShortcutsDialog(),
    },
  ];

  useEffect(() => {
    let buffer = "";
    let bufferTimeout: number;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      buffer += e.key;
      clearTimeout(bufferTimeout);

      // Clear buffer after 1 second
      bufferTimeout = window.setTimeout(() => {
        buffer = "";
      }, 1000);

      // Check shortcuts
      shortcuts.forEach((shortcut) => {
        if (buffer.endsWith(shortcut.key)) {
          shortcut.action();
          buffer = "";
        }
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return shortcuts;
};

const showShortcutsDialog = () => {
  // Show keyboard shortcuts dialog
  // This will be implemented with a modal component
};
