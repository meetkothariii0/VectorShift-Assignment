/**
 * Theme Toggle Component
 * 
 * Button to switch between dark and light modes
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="uiverse-button"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};
