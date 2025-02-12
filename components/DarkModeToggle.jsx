// app/components/DarkModeToggle.jsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pastikan komponen hanya dirender setelah mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
