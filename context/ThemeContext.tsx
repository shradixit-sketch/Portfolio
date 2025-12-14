
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { ThemeSettings, ThemeContextType, ColorPalette, FontSettings, ThemeMode } from '../types';
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY } from '../constants';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    try {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
      return storedTheme ? JSON.parse(storedTheme) : DEFAULT_THEME;
    } catch (error) {
      console.error("Failed to parse theme from localStorage, using default.", error);
      return DEFAULT_THEME;
    }
  });

  const applyCssVariables = useCallback((colors: ColorPalette, fonts: FontSettings) => {
    const root = document.documentElement;

    // Apply colors
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-background-dark', colors.backgroundDark);
    root.style.setProperty('--color-text-light', colors.textLight);
    root.style.setProperty('--color-text-dark', colors.textDark);
    root.style.setProperty('--color-card-background', colors.cardBackground);
    root.style.setProperty('--color-card-background-dark', colors.cardBackgroundDark);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-border-dark', colors.borderDark);

    // Apply fonts (dynamic loading for Google Fonts is complex, assumes pre-loaded or fallbacks)
    root.style.setProperty('--font-primary', `'${fonts.primary}', sans-serif`);
    root.style.setProperty('--font-heading', `'${fonts.heading}', sans-serif`);

    // Add Google Fonts link if not already present (simplified for demonstration)
    const fontLink1 = `https://fonts.googleapis.com/css2?family=${fonts.primary.replace(/\s/g, '+')}:wght@300;400;500;600;700&display=swap`;
    const fontLink2 = `https://fonts.googleapis.com/css2?family=${fonts.heading.replace(/\s/g, '+')}:wght@700&display=swap`;

    if (!document.querySelector(`link[href="${fontLink1}"]`)) {
      const link = document.createElement('link');
      link.href = fontLink1;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (fonts.primary !== fonts.heading && !document.querySelector(`link[href="${fontLink2}"]`)) {
      const link = document.createElement('link');
      link.href = fontLink2;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

  }, []);

  useEffect(() => {
    // Apply initial CSS variables on mount
    applyCssVariables(theme.colors, theme.fonts);

    // Apply dark/light mode class to body
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save theme to localStorage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
  }, [theme, applyCssVariables]);

  const toggleThemeMode = useCallback(() => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: prevTheme.mode === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const updateColor = useCallback((key: keyof ColorPalette, value: string) => {
    setTheme((prevTheme) => {
      const newColors = { ...prevTheme.colors, [key]: value };
      applyCssVariables(newColors, prevTheme.fonts); // Update CSS variables immediately
      return { ...prevTheme, colors: newColors };
    });
  }, [applyCssVariables]);

  const updateFont = useCallback((key: keyof FontSettings, value: string) => {
    setTheme((prevTheme) => {
      const newFonts = { ...prevTheme.fonts, [key]: value };
      applyCssVariables(prevTheme.colors, newFonts); // Update CSS variables immediately
      return { ...prevTheme, fonts: newFonts };
    });
  }, [applyCssVariables]);

  const contextValue = React.useMemo(() => ({
    theme,
    setTheme,
    toggleThemeMode,
    updateColor,
    updateFont,
    applyCssVariables,
  }), [theme, toggleThemeMode, updateColor, updateFont, applyCssVariables]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
