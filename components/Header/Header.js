import Title from './Title';
import LogoutDropDown from './LogoutDropDown';
import renderThemeChanger from 'utils/ChangeTheme';
import Navigation from './Navigation';
import useUser from 'hooks/useUser';
import LoginButton from './LoginButton';
import Head from 'next/head';
import InputSearch from './InputSearch';

const Header = ({ title, description, data }) => {
  const user = useUser();

  return (
    <header className="flex items-center justify-center w-full bg-white dark:bg-gray-900">
      <Head>
        <title>{title ? `${title} - TITULO A VER` : 'TITULO A VER'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <nav
        className="py-4 flex flex-col gap-4 sm:gap-5 px-10 lg:flex-row
      place-content-between bg-white dark:bg-gray-900 items-center w-[75%]"
      >
        <div className="flex items-center">
          <Title title={data?.title} />
          <InputSearch />
        </div>
        <div className="flex">
          <Navigation inicio={data?.inicio} rankingWord={data?.ranking} />

          <div className="flex items-center ml-20">
            {user ? (
              <LogoutDropDown
                user={user}
                miPerfil={data?.miPerfil}
                misProyectos={data?.misProyectos}
              />
            ) : (
              <LoginButton />
            )}
            {renderThemeChanger()}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
