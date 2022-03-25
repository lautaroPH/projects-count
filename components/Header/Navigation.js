import Link from 'next/link';
import { BriefcaseIcon, ChartBarIcon, HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { pagesLinks } from 'utils/defaultValues';

const Navigation = () => {
  const { pathname } = useRouter();

  const { home, myProjects, ranking } = pagesLinks;

  return (
    <div
      className="fixed bottom-0 z-10 flex justify-center
    w-full gap-6 bg-white py-1 sm:p-0 dark:bg-gray-900 
    sm:bg-transparent sm:static sm:w-auto border-t sm:border-none"
    >
      <Link href={home} passHref>
        <a className={pathname == home ? 'navigation-active' : 'navigation '}>
          <HomeIcon className="h-6 w-6" />
          <span className="hidden sm:block">Inicio</span>
        </a>
      </Link>
      <Link href={ranking} passHref>
        <a
          className={pathname == ranking ? 'navigation-active' : 'navigation '}
        >
          <ChartBarIcon className="h-6 w-6" />
          <span className="hidden sm:block">Ranking</span>
        </a>
      </Link>
      <Link href={myProjects} passHref>
        <a
          className={
            pathname == myProjects ? 'navigation-active' : 'navigation '
          }
        >
          <BriefcaseIcon className="h-6 w-6" />
          <span className="hidden sm:block">Mis proyectos</span>
        </a>
      </Link>
    </div>
  );
};

export default Navigation;
