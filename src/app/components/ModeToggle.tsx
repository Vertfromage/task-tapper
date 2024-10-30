import { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the dark mode class on the <html> element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`ml-4 px-4 py-2 rounded-lg font-semibold transition ${
        isDarkMode ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
      }`}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
