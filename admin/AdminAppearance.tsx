
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ColorPalette, FontSettings } from '../types';

export const AdminAppearance: React.FC = () => {
  const { theme, toggleThemeMode, updateColor, updateFont, applyCssVariables } = useTheme();
  const [localColors, setLocalColors] = useState<ColorPalette>(theme.colors);
  const [localFonts, setLocalFonts] = useState<FontSettings>(theme.fonts);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalColors(theme.colors);
    setLocalFonts(theme.fonts);
  }, [theme]);

  const handleColorChange = (key: keyof ColorPalette, value: string) => {
    setLocalColors((prev) => ({ ...prev, [key]: value }));
    // Temporarily apply for preview
    applyCssVariables({ ...localColors, [key]: value }, localFonts);
  };

  const handleFontChange = (key: keyof FontSettings, value: string) => {
    setLocalFonts((prev) => ({ ...prev, [key]: value }));
    // Temporarily apply for preview
    applyCssVariables(localColors, { ...localFonts, [key]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call to save theme
    await new Promise((resolve) => setTimeout(resolve, 1000));
    Object.keys(localColors).forEach((key) =>
      updateColor(key as keyof ColorPalette, localColors[key as keyof ColorPalette])
    );
    Object.keys(localFonts).forEach((key) =>
      updateFont(key as keyof FontSettings, localFonts[key as keyof FontSettings])
    );
    setIsSaving(false);
    alert('Appearance settings saved successfully!');
  };

  const colorOptions: Array<{ key: keyof ColorPalette; label: string }> = [
    { key: 'primary', label: 'Primary Accent' },
    { key: 'secondary', label: 'Secondary Accent' },
    { key: 'background', label: 'Light Background' },
    { key: 'backgroundDark', label: 'Dark Background' },
    { key: 'textLight', label: 'Light Mode Text' },
    { key: 'textDark', label: 'Dark Mode Text' },
    { key: 'cardBackground', label: 'Light Card Background' },
    { key: 'cardBackgroundDark', label: 'Dark Card Background' },
    { key: 'border', label: 'Light Border' },
    { key: 'borderDark', label: 'Dark Border' },
  ];

  const fontOptions: Array<{ key: keyof FontSettings; label: string }> = [
    { key: 'primary', label: 'Primary Font (Body)' },
    { key: 'heading', label: 'Heading Font' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-textLight dark:text-textDark">Appearance Customization</h1>

      <Button onClick={handleSave} isLoading={isSaving} className="fixed bottom-4 right-4 z-50">
        {isSaving ? 'Saving...' : 'Save Appearance'}
      </Button>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Theme Mode</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Current mode: <span className="font-medium capitalize">{theme.mode}</span>
        </p>
        <Button onClick={toggleThemeMode} variant="secondary">
          Switch to {theme.mode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Colors</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Select custom colors for your website. Changes will be previewed live.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {colorOptions.map((option) => (
            <div key={option.key} className="flex flex-col space-y-2">
              <label htmlFor={`color-${option.key}`} className="text-sm font-medium text-textLight dark:text-textDark">
                {option.label}
              </label>
              <Input
                id={`color-${option.key}`}
                type="color"
                value={localColors[option.key]}
                onChange={(e) => handleColorChange(option.key, e.target.value)}
                className="w-full h-12 p-1 border-none rounded-md cursor-pointer"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">{localColors[option.key]}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-textLight dark:text-textDark">Fonts</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Specify Google Font names. Ensure the fonts are loaded in `index.html` or through a service.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {fontOptions.map((option) => (
            <Input
              key={option.key}
              id={`font-${option.key}`}
              label={option.label}
              type="text"
              value={localFonts[option.key]}
              onChange={(e) => handleFontChange(option.key, e.target.value)}
              placeholder="e.g., Inter"
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Note: For optimal performance and full font weight support, ensure selected Google Fonts are correctly
          imported in `index.html` or managed via a dedicated font loading strategy.
        </p>
      </Card>
    </div>
  );
};
