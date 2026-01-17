// FIX: Implemented the ResultPage component to correctly render the visualization view.
import React from 'react';
import DotGrid from './DotGrid';
import ThemeSwitcher from './ThemeSwitcher';
import ModeSelector from './ModeSelector';
import LifespanSlider from './LifespanSlider';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { Theme, Mode, DotData } from '../types';

interface ResultPageProps {
  dotData: DotData;
  dob: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onReset: () => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  lifespan: number;
  setLifespan: (lifespan: number) => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  dotData,
  dob,
  theme,
  setTheme,
  onReset,
  mode,
  setMode,
  lifespan,
  setLifespan,
}) => {
  const livedPercentage =
    dotData.total > 0 ? ((dotData.lived / dotData.total) * 100).toFixed(2) : 0;

  return (
    <div className="flex flex-col h-screen p-4 md:p-6 lg:p-8 relative">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 w-full flex-shrink-0 z-10">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={onReset}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold">
              Your Life in {mode === 'weeks' ? 'Weeks' : 'Months'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You've lived {dotData.lived} of {dotData.total} {mode}. That's{' '}
              {livedPercentage}%.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
          <LifespanSlider lifespan={lifespan} setLifespan={setLifespan} />
          <ModeSelector mode={mode} setMode={setMode} />
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-4 md:py-6 relative overflow-hidden">
        <div className="w-full h-full max-w-7xl mx-auto">
          <DotGrid dotData={dotData} dob={dob} mode={mode} />
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
