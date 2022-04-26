import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { logout } from 'firebaseFunction/logout';
import Link from 'next/link';

const LogoutDropDown = ({ user, misProyectos, miPerfil }) => {
  return (
    <Menu as="div" className="relative text-left md:inline-block">
      <div>
        <Menu.Button className="flex items-center mr-6 text-sm rounded-full text-violet-700 dark:text-white hover:opacity-80">
          <div className="w-8 h-8">
            <Image
              className="rounded-full"
              src={user?.avatar}
              alt="User avatar"
              width={32}
              height={32}
              layout="responsive"
            />
          </div>
          <span className="ml-2 font-semibold">Yo</span>
          <ChevronDownIcon
            className="w-5 h-5 mt-1 ml-1 -mr-1"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 text-center origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Link href={`/usuario/${user?.id}`} passHref>
            <a className="w-full text-sm font-semibold text-purple-600 cursor-pointer md:text-sm">
              <Menu.Item>
                <span className="hidden py-2 transition-colors duration-300 ease-in-out sm:block rounded-t-md hover:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-700">
                  {misProyectos}
                </span>
              </Menu.Item>
            </a>
          </Link>
          <Link href={`/usuario/${user?.id}`} passHref>
            <a className="w-full text-sm font-semibold text-purple-600 cursor-pointer md:text-sm">
              <Menu.Item>
                <span className="hidden py-2 transition-colors duration-300 ease-in-out sm:block hover:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-700">
                  {miPerfil}
                </span>
              </Menu.Item>
            </a>
          </Link>
          <button
            onClick={logout}
            className="w-full py-2 text-xs font-semibold text-center text-purple-600 transition-colors duration-300 ease-in-out rounded-b-md hover:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-700 md:text-sm"
          >
            <Menu.Item>
              <span>Cerrar sesion</span>
            </Menu.Item>
          </button>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LogoutDropDown;
