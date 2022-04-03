import Link from 'next/link';
import GithubSvgLight from 'assets/GithubSvgLight';
import GithubSvgDark from 'assets/GithubSvgDark';
import { useTheme } from 'next-themes';
import GithubSvgViolet from 'assets/GithubSvgViolet';
import Button from './Button';
const Buttons = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="flex flex-col items-center justify-center w-full sm:flex-row sm:justify-around xl:mt-20 md:w-4/5">
      {currentTheme === 'dark' ? (
        <Button firstIcon={<GithubSvgLight />} secondIcon={<GithubSvgDark />} />
      ) : (
        <Button
          firstIcon={<GithubSvgViolet />}
          secondIcon={<GithubSvgLight />}
        />
      )}

      <Link passHref href="/inicio">
        <a
          className="flex items-center justify-center sm:w-[45%] buttonsIndex bg-violet-800 text-white  dark:bg-white dark:text-[#282C34]
        hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white  hover:text-violet-800
         w-4/5"
        >
          Entrar como invitado
        </a>
      </Link>
    </div>
  );
};

export default Buttons;
