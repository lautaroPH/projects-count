import Title from './Title';
import LogoutDropDown from './LogoutDropDown';
import renderThemeChanger from 'utils/ChangeTheme';
import Navigation from './Navigation';
import useUser from 'hooks/useUser';
import LoginButton from './LoginButton';
import Head from 'next/head';

const Header = ({ title, description }) => {
  const user = useUser();

  return (
    <header className="flex bg-white dark:bg-gray-900 w-full items-center justify-center">
      <Head>
        <title>{title ? `${title} - TITULO A VER` : 'TITULO A VER'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <nav
        className="py-4 flex flex-col gap-4 sm:gap-5 px-10 lg:flex-row
      place-content-between bg-white dark:bg-gray-900 items-center w-[75%]"
      >
        <Title />

        <Navigation />

        <div className="flex items-center">
          {user ? <LogoutDropDown user={user} /> : <LoginButton />}
          {renderThemeChanger()}
        </div>
      </nav>
    </header>
  );
};

export default Header;
