export type Theme = "light" | "dark" | "matrix" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
