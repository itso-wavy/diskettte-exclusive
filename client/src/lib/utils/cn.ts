import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDynamicCn = (classes: string[]): string => classes.join('-');
// getDynamicCn(['text', theme, 'primary']) => `text-${theme}-primary`
