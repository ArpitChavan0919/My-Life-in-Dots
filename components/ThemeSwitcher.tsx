
import React from 'react';
import { Theme } from '../types';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { DropletIcon } from './icons/DropletIcon';

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const themes: Theme[] = ['light', 'dark', 'glass'];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-200 dark:bg-gray-800 rounded-full">
      <button onClick={() => handleThemeChange('light')} className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-white dark:bg-gray-600' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
        <SunIcon />
      </button>
      <button onClick={() => handleThemeChange('dark')} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-white dark:bg-gray-600' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
        <MoonIcon />
      </button>
      <button onClick={() => handleThemeChange('glass')} className={`p-2 rounded-full transition-colors ${theme === 'glass' ? 'bg-white dark:bg-gray-600' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
        <DropletIcon />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
