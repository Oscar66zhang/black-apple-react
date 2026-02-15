import React from "react";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { useState } from "react";
const DarkToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {
    setIsDark((prev) => {
      const newDarkMode = !prev;
      const root = document.documentElement;
      if (newDarkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      return newDarkMode;
    });
  };

  return (
    <button
      className="p-1
     bg-gray-200 
     dark:bg-gray-600
     rounded-full 
     hover:bg-gray-300
  dark:hover:bg-gray-400
    transition-all
    duration-300
    hover:rotate-12
     "
      onClick={toggleDark}
    >
      {!isDark ? (
        <FiMoon
          size={24}
          className="text-gray-800 dark:text-gray-200 animate-pulse"
        />
      ) : (
        <FiSun size={24} className="text-yellow-400 animate-pulse" />
      )}
    </button>
  );
};

export default DarkToggle;
