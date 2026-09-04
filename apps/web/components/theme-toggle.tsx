'use client';

import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
