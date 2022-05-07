import Link from 'next/link';
import { ChartBarIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { pagesLinks } from 'utils/defaultValues';

const Navigation = ({ inicio, rankingWord, setsearchMobile, searchMobile }) => {
  const { pathname } = useRouter();

  const { home, ranking } = pagesLinks;

  return (
    <div className="fixed bottom-0 z-10 flex justify-center w-full gap-6 py-1 bg-white border-t dark:border-gray-800  lg:p-0 dark:bg-gray-900 lg:bg-transparent lg:static lg:w-auto lg:border-none right-0">
      <Link href={home} passHref>
        <a className={pathname == home ? 'navigation-active' : 'navigation '}>
          <HomeIcon className="w-6 h-6" />
          <span className="hidden sm:block">{inicio}</span>
        </a>
      </Link>
      <button
        className="navigation-active lg:hidden"
        onClick={() => {
          searchMobile ? setsearchMobile(false) : setsearchMobile(true);
        }}
      >
        <SearchIcon className="w-6 h-6" />
        <span className="hidden sm:block">Buscar</span>
      </button>
      <Link href={ranking} passHref>
        <a
          className={pathname == ranking ? 'navigation-active' : 'navigation '}
        >
          <ChartBarIcon className="w-6 h-6" />
          <span className="hidden sm:block">{rankingWord}</span>
        </a>
      </Link>
    </div>
  );
};

export default Navigation;
