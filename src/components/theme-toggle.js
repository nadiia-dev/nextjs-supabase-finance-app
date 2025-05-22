"use client";
import useDarkMode from "@/hooks/use-dark-mode";
import { Moon, Sun } from "lucide-react";
import Button from "./button";

const ThemeToggle = ({ defaultMode = "dark" }) => {
  const { theme, toggleTheme } = useDarkMode(defaultMode);
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" && <Moon className="w-6 h-6" />}
      {theme === "dark" && <Sun className="w-6 h-6" />}
    </Button>
  );
};

export default ThemeToggle;
