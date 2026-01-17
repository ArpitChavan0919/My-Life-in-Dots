import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import usePrefersDarkMode from './hooks/usePrefersDarkMode';
import HomePage from './components/HomePage';
// FIX: Correctly import ResultPage, which will be fixed in its own file.
import ResultPage from './components/ResultPage';
import { Theme, Mode, DotData } from './types';
import { calculateDots } from './utils/dateCalculations';

function App() {
  const [dob, setDob] = useLocalStorage<string | null>('dob', null);
  const prefersDarkMode = usePrefersDarkMode();
  const [theme, setTheme] = useLocalStorage<Theme>('theme', prefersDarkMode ? 'dark' : 'light');
  const [mode, setMode] = useLocalStorage<Mode>('mode', 'weeks');
  // FIX: Added lifespan state to allow for dynamic adjustment.
  const [lifespan, setLifespan] = useLocalStorage<number>('lifespan', 80);
  const [dotData, setDotData] = useState<DotData | null>(null);

  useEffect(() => {
    if (mode !== 'weeks' && mode !== 'months') {
      setMode('weeks');
    }
  }, [mode, setMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme === 'dark' ? 'dark' : 'light');

    body.classList.remove('light-theme', 'dark-theme', 'glass-theme');
    if (theme === 'glass') {
      body.classList.add('glass-theme');
    } else if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.add('light-theme');
    }

  }, [theme]);
  
  // FIX: Updated useEffect to recalculate dots when lifespan changes.
  useEffect(() => {
    if (dob && (mode === 'weeks' || mode === 'months')) {
      setDotData(calculateDots(dob, mode, lifespan));
    }
  }, [dob, mode, lifespan]);

  const handleSetDob = (newDob: string) => {
    setDob(newDob);
  };

  const handleReset = () => {
    setDob(null);
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden w-full text-black dark:text-white transition-colors duration-500">
      {dob && dotData ? (
        // FIX: Passed lifespan state and setter to ResultPage.
        <ResultPage
          dotData={dotData}
          dob={dob}
          theme={theme}
          setTheme={setTheme}
          onReset={handleReset}
          mode={mode}
          setMode={setMode}
          lifespan={lifespan}
          setLifespan={setLifespan}
        />
      ) : (
        <HomePage onSetDob={handleSetDob} />
      )}
    </div>
  );
}

export default App;