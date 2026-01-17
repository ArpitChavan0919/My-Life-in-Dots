import { DotData, Mode } from '../types';

// FIX: Removed hardcoded LIFESPAN_YEARS to allow for dynamic lifespan adjustment.

const diffInWeeks = (d1: Date, d2: Date): number => {
  const diffInMs = d1.getTime() - d2.getTime();
  if (diffInMs < 0) return 0;
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
};

const diffInTotalMonths = (d1: Date, d2: Date): number => {
  let months;
  months = (d1.getFullYear() - d2.getFullYear()) * 12;
  months -= d2.getMonth();
  months += d1.getMonth();
  return months <= 0 ? 0 : months;
};

// FIX: Added lifespan parameter to calculate total dots based on user input.
export const calculateDots = (dobString: string, mode: Mode, lifespan: number): DotData => {
  if (!dobString) {
    return { total: 0, lived: 0 };
  }
  
  const dob = new Date(dobString);
  const now = new Date();

  switch (mode) {
    case 'weeks':
      return {
        total: lifespan * 52,
        lived: diffInWeeks(now, dob),
      };
    case 'months':
      return {
        total: lifespan * 12,
        lived: diffInTotalMonths(now, dob),
      };
    default:
      return { total: 0, lived: 0 };
  }
};


export const getDetailsForDot = (index: number, dobString: string, mode: Mode): string => {
  const dob = new Date(dobString);
  let targetDate = new Date(dob);
  
  switch (mode) {
    case 'weeks':
      targetDate.setDate(dob.getDate() + index * 7);
      break;
    case 'months':
      targetDate.setMonth(dob.getMonth() + index);
      break;
  }

  const totalMonths = diffInTotalMonths(targetDate, dob);
  const ageYears = Math.floor(totalMonths / 12);
  const ageMonths = totalMonths % 12;
  
  switch (mode) {
    case 'weeks':
      return `Week #${index + 1} | Age: ${ageYears}y ${ageMonths}m`;
    case 'months':
      return `Month #${index + 1} | Age: ${ageYears}y ${ageMonths}m`;
    default:
      return '';
  }
};