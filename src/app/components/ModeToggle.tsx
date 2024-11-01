import { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved preference in localStorage; default to true (dark mode) if none is found
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  // Toggle the dark mode class on the <html> element and save the preference in localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`ml-4 px-4 py-2 rounded-lg font-semibold transition ${
        isDarkMode ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'
      }`}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
