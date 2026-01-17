import React, { useState, useRef, useLayoutEffect } from 'react';
import Dot from './Dot';
import { DotData, Mode } from '../types';
import { getDetailsForDot } from '../utils/dateCalculations';

interface DotGridProps {
  dotData: DotData;
  dob: string;
  mode: Mode;
}

const DotGrid: React.FC<DotGridProps> = ({ dotData, dob, mode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridConfig, setGridConfig] = useState<{ cols: number; rows: number } | null>(null);
  const { total, lived } = dotData;

  useLayoutEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (!entries || entries.length === 0 || total === 0) {
        return;
      }
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        const aspectRatio = width / height;
        const cols = Math.ceil(Math.sqrt(total * aspectRatio));
        const rows = Math.ceil(total / cols);
        setGridConfig({ cols, rows });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [total]);

  if (total === 0) {
    return <div ref={containerRef} className="w-full h-full" />;
  }

  const dots = Array.from({ length: total }, (_, i) => {
    const isLived = i < lived;
    const tooltipContent = getDetailsForDot(i, dob, mode);
    return (
      <Dot
        key={i}
        isLived={isLived}
        tooltipContent={tooltipContent}
      />
    );
  });

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      {gridConfig && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
            gap: '2px',
            width: '100%',
            maxHeight: '100%',
            aspectRatio: `${gridConfig.cols} / ${gridConfig.rows}`
          }}
        >
          {dots}
        </div>
      )}
    </div>
  );
};

export default DotGrid;