import React from 'react';

interface DotProps {
  isLived: boolean;
  tooltipContent: string;
}

const Dot: React.FC<DotProps> = ({ isLived, tooltipContent }) => {
  const livedClasses = 'bg-black dark:bg-white';
  const unlivedClasses = 'bg-gray-200 dark:bg-gray-700';

  return (
    <div className="relative group flex items-center justify-center aspect-square">
      <div
        className={`w-full h-full rounded-full transition-all duration-300 ease-in-out group-hover:scale-150 ${isLived ? livedClasses : unlivedClasses}`}
      ></div>
      <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-lg">
        {tooltipContent}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black dark:border-t-white"></div>
      </div>
    </div>
  );
};

export default React.memo(Dot);
