/* eslint-disable react-hooks/rules-of-hooks */
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const renderThemeChanger = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (currentTheme === 'dark') {
    return (
      <SunIcon
        className="w-7 h-7 ml-2"
        role="button"
        onClick={() => setTheme('light')}
      />
    );
  } else {
    return (
      <MoonIcon
        className="w-7 h-7 ml-2"
        role="button"
        onClick={() => setTheme('dark')}
      />
    );
  }
};

export default renderThemeChanger;
