import Title from './Title';
import LogoutDropDown from './LogoutDropDown';
import renderThemeChanger from 'utils/ChangeTheme';
import Navigation from './Navigation';
import useUser from 'hooks/useUser';
import LoginButton from './LoginButton';
import Head from 'next/head';
import InputSearch from './InputSearch';
import { useState } from 'react';

const Header = ({ title, description, data }) => {
  const user = useUser();

  const [searchMobile, setsearchMobile] = useState(false);

  return (
    <header className="flex items-center w-full bg-white lg:justify-center dark:bg-gray-900">
      <Head>
        <title>{title ? `${title} - Shareit` : 'Shareit'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <nav
        className="py-4 flex gap-4 sm:gap-5 px-4 xl:px-10 flex-row
      place-content-evenly bg-white dark:bg-gray-900 items-center w-full lg:w-[75%]"
      >
        <div className="flex items-center justify-center">
          <Title title={data?.title} />
        </div>
        <InputSearch
          searchMobile={searchMobile}
          setsearchMobile={setsearchMobile}
        />
        <div className="flex">
          <Navigation
            inicio={data?.inicio}
            rankingWord={data?.ranking}
            searchMobile={searchMobile}
            setsearchMobile={setsearchMobile}
          />

          <div className="flex items-center lg:ml-10">
            {user ? (
              <LogoutDropDown
                user={user}
                miPerfil={data?.miPerfil}
                misProyectos={data?.misProyectos}
              />
            ) : (
              <LoginButton searchMobile={searchMobile} />
            )}
            {renderThemeChanger()}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
