import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { logout } from 'firebaseMain/firebaseFunction';
import Image from 'next/image';

const LogoutDropDown = ({ user }) => {
  return (
    <Menu as="div" className="md:inline-block relative  text-left">
      <div>
        <Menu.Button className="flex text-violet-700 dark:text-white items-center text-sm rounded-full hover:opacity-80 mr-6">
          <div className="h-8 w-8">
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
            className="-mr-1 ml-1 mt-1 h-5 w-5"
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
        <Menu.Items
          className="origin-top-right absolute right-0 mt-2 w-36 
        rounded-md shadow-lg bg-white transition-colors
        duration-300 hover:bg-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1 text-center">
            <Menu.Item>
              {() => (
                <button
                  onClick={logout}
                  className="inline-flex text-purple-600 dark:text-gray-700
                  font-semibold text-sm md:text-lg mr-2"
                >
                  Cerrar sesion
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LogoutDropDown;
