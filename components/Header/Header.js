import Title from "./Title";
import LogoutDropDown from "./LogoutDropDown";
import renderThemeChanger from "utils/ChangeTheme";
import Navigation from "./Navigation";
import useUser from "hooks/useUser";
import LoginButton from "./LoginButton";
import Head from "next/head";
import { SearchIcon } from "@heroicons/react/solid";

const Header = ({ title, description, data }) => {
  const user = useUser();

  return (
    <header className="flex items-center justify-center w-full bg-white dark:bg-gray-900">
      <Head>
        <title>{title ? `${title} - TITULO A VER` : "TITULO A VER"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <nav
        className="py-4 flex flex-col gap-4 sm:gap-5 px-10 lg:flex-row
      place-content-between bg-white dark:bg-gray-900 items-center w-[75%]"
      >
        <div className="flex items-center">
          <Title title={data?.title} />
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              className="ml-20 bg-transparent flex justify-start border border-gray-400 dark:border-gray-500 rounded-full focus:outline-none px-2 py-1 w-60"
            />
            <SearchIcon className="h-6 w-6 text-violet-700 dark:text-white ml-2 cursor-pointer" />
          </div>
        </div>
        <div className="flex">
          <Navigation
            inicio={data?.inicio}
            rankingWord={data?.ranking}
            misProyectos={data?.misProyectos}
          />

          <div className="flex items-center ml-20">
            {user ? <LogoutDropDown user={user} /> : <LoginButton />}
            {renderThemeChanger()}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
