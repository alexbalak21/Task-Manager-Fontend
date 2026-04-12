import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
const VALID_THEMES: Theme[] = ["light", "dark", "system"];
const FORCE_LIGHT_MODE = true;

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  // Apply theme to <html>
  const applyTheme = (t: Theme) => {
    if (t === "light") {
      document.documentElement.classList.remove("dark");
    } else if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Load saved theme mode on mount
  useEffect(() => {
    const savedValue = localStorage.getItem("themeMode");
    const saved = VALID_THEMES.includes(savedValue as Theme)
      ? (savedValue as Theme)
      : null;
    const initial = FORCE_LIGHT_MODE ? "light" : (saved || "light");
    setTheme(initial);
    if (FORCE_LIGHT_MODE) {
      localStorage.setItem("themeMode", "light");
    }
    applyTheme(initial);
  }, []);

  // Sync with OS theme when in system mode
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  // Public setter
  const changeTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("themeMode", t);
    applyTheme(t);
  };

  return { theme, setTheme: changeTheme };
}