
import React from 'react';

interface LifespanSliderProps {
  lifespan: number;
  setLifespan: (lifespan: number) => void;
}

const LifespanSlider: React.FC<LifespanSliderProps> = ({ lifespan, setLifespan }) => {
  return (
    <div className="flex items-center gap-3 w-full md:max-w-xs">
      <label htmlFor="lifespan" className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
        Lifespan
      </label>
      <input
        id="lifespan"
        type="range"
        min="50"
        max="120"
        value={lifespan}
        onChange={(e) => setLifespan(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-sm font-semibold w-8 text-center">{lifespan}</span>
    </div>
  );
};

export default LifespanSlider;
