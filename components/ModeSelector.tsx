import React from 'react';
import { Mode } from '../types';

interface ModeSelectorProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const modes: { id: Mode; label: string }[] = [
  { id: 'weeks', label: 'Weeks' },
  { id: 'months', label: 'Months' },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  return (
    <div className="flex items-center p-1 bg-gray-200/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 capitalize relative transform active:scale-95 outline-none focus:outline-none ${
            mode === m.id 
              ? 'bg-white dark:bg-black shadow text-black dark:text-white' 
              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;