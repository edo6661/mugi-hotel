"use client";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const CustomToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const el = (
    <label className="container-theme" data-theme={theme}>
      <motion.div
        className=" w-8 h-6 rounded-full "
        transition={{ type: "spring" }}
        layout
      >
        {isDark ? <Moon /> : <Sun />}
        <input
          type="checkbox"
          id="theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="hidden"
        />
      </motion.div>
    </label>
  );
  return el;
};

export default CustomToggleTheme;
