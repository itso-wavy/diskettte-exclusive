import { PropsWithChildren, createContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ThemeState } from '@/lib/types';
import { cn } from '@/lib/utils';

export const ThemeContext = createContext<ThemeState | null>(null);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme, isDarkmode } = useSelector((state: RootState) => state.theme);

  return (
    <ThemeContext.Provider value={{ theme, isDarkmode }}>
      <div
        className={cn(
          isDarkmode && 'dark',
          `theme-${theme}`,
          '*:bg-background *:text-foreground'
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
