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
    <div className="flex justify-center items-center flex-col sm:flex-row sm:justify-around xl:mt-20 w-full md:w-4/5">
      {currentTheme === 'dark' ? (
        <Button firstIcon={<GithubSvgLight />} secondIcon={<GithubSvgDark />} />
      ) : (
        <Button
          firstIcon={<GithubSvgViolet />}
          secondIcon={<GithubSvgLight />}
        />
      )}

      <Link passHref href="/inicio">
        <a className="w-4/5 sm:w-[45%]">
          <button
            className="buttonsIndex bg-violet-800 text-white  dark:bg-white dark:text-[#282C34]
        hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white  hover:text-violet-800
         w-full
        "
          >
            Entrar como invitado
          </button>
        </a>
      </Link>
    </div>
  );
};

export default Buttons;
