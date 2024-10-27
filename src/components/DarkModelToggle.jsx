// src/components/DarkModeToggle.jsx
import React, { useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('bg-gray-900', !isDarkMode);
    document.body.classList.toggle('bg-gray-100', isDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="ml-4">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
