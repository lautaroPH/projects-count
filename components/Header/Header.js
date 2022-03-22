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
    <header className="flex place-content-center">
      <Head>
        <title>{title ? `${title} - TITULO A VER` : 'TITULO A VER'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <nav
        className="container py-4 flex flex-col gap-5 px-10 lg:flex-row
      place-content-between bg-white 282C34 dark:bg-gray-900 lg:rounded-lg lg:mx-2 lg:mt-4 items-center"
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
