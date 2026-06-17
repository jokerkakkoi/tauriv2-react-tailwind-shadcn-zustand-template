import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type AppState = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "app-store" },
  ),
);

export function resolveThemeClass(theme: ThemeMode): "light" | "dark" {
  if (theme === "dark") return "dark";
  if (theme === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}