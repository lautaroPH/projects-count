import { useState, useEffect } from 'react';
import GithubSvgDark from 'assets/GithubSvgDark';
import GithubSvgLight from 'assets/GithubSvgLight';
import GithubSvgViolet from 'assets/GithubSvgViolet';
import { useTheme } from 'next-themes';
import ButtonSelectSvgToLogin from './ButtonSelectSvgToLogin';

const LoginButton = ({ searchMobile }) => {
  const { systemTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(
    () => setCurrentTheme(theme === 'system' ? systemTheme : theme),
    [systemTheme, theme]
  );

  return (
    <div>
      {currentTheme === 'dark' ? (
        <ButtonSelectSvgToLogin
          firstIcon={<GithubSvgDark />}
          secondIcon={<GithubSvgLight />}
          searchMobile={searchMobile}
        />
      ) : (
        <ButtonSelectSvgToLogin
          firstIcon={<GithubSvgLight />}
          secondIcon={<GithubSvgViolet />}
          searchMobile={searchMobile}
        />
      )}
    </div>
  );
};

export default LoginButton;
