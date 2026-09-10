"use client";

import { useEffect, useState } from "react";

export function useThemeMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("portfolio-theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme((current) => (current === "dark" ? "light" : "dark"));
    window.setTimeout(() => setIsTransitioning(false), 900);
  };

  return { theme, toggleTheme, isTransitioning };
}
