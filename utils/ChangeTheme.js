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
        style={{ width: '28px', height: '28px', marginLeft: '8px' }}
        role="button"
        onClick={() => setTheme('light')}
      />
    );
  } else {
    return (
      <MoonIcon
        style={{ width: '28px', height: '28px', marginLeft: '8px' }}
        role="button"
        onClick={() => setTheme('dark')}
      />
    );
  }
};

export default renderThemeChanger;
