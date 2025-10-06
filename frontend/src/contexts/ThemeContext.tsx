import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  accent: string;
  siteName: string;
  logo: string | null;
  toggleTheme: () => void;
  setAccent: (color: string) => void;
  setSiteName: (name: string) => void;
  setLogo: (logo: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [accent, setAccent] = useState<string>(
    localStorage.getItem("accent") || "#14b8a6"
  );
  const [siteName, setSiteName] = useState<string>(
    localStorage.getItem("siteName") || "WellnessHub"
  );
  const [logo, setLogo] = useState<string | null>(
    localStorage.getItem("siteLogo") || null
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", accent);
    localStorage.setItem("accent", accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem("siteName", siteName);
    if (logo) localStorage.setItem("siteLogo", logo);
  }, [siteName, logo]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const value: ThemeContextType = {
    theme,
    accent,
    siteName,
    logo,
    toggleTheme,
    setAccent,
    setSiteName,
    setLogo,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

export default ThemeProvider;
