import Link from 'next/link';
import { ChartBarIcon, HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { pagesLinks } from 'utils/defaultValues';

const Navigation = ({ inicio, rankingWord }) => {
  const { pathname } = useRouter();

  const { home, ranking } = pagesLinks;

  return (
    <div className="fixed bottom-0 z-10 flex justify-center w-full gap-6 py-1 bg-white border-t sm:p-0 dark:bg-gray-900 sm:bg-transparent sm:static sm:w-auto sm:border-none">
      <Link href={home} passHref>
        <a className={pathname == home ? 'navigation-active' : 'navigation '}>
          <HomeIcon className="w-6 h-6" />
          <span className="hidden sm:block">{inicio}</span>
        </a>
      </Link>
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
