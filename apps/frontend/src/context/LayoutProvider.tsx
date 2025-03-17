import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import * as components from '../theme';

type LayoutContext = {
  headerRef: React.RefObject<HTMLDivElement | null> | null;
  headerHeight: number;
};

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutContext = createContext<LayoutContext | undefined>(undefined);

export const useLayoutContext = (): LayoutContext => {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    throw new Error('useLayoutContext must be within LayoutProvider');
  }

  return context;
};

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const updateHeights = () => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  };

  const theme = responsiveFontSizes(
    createTheme({
      components,
      typography: {
        fontFamily: 'Manrope, sans-serif',
      },
      palette: {
        mode: 'dark',
      },
    })
  );

  useEffect(() => {
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => {
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  const contextValue = useMemo<LayoutContext>(
    () => ({
      headerRef,
      headerHeight,
    }),
    [headerRef, headerHeight]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </LayoutContext.Provider>
  );
};
