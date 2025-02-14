import { useEffect } from "react";

export const useKeyboardFocus = () => {
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-focus");
        window.removeEventListener("keydown", handleFirstTab);
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-focus");
    };

    window.addEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
};
