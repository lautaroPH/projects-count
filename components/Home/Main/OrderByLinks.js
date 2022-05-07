import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { OrderByValue } from 'context/OrderByContext';
import { Fragment, useContext } from 'react';
import { orderByValues } from 'utils/defaultValues';

const OrderByLinks = () => {
  const { value, setValue } = useContext(OrderByValue);

  const handleClick = (e) => {
    const valueText = e.target.innerText;
    localStorage.setItem('orderBy', valueText);
    setValue(valueText);
  };

  return (
    <Menu
      as="div"
      className="relative flex items-center justify-end py-4 pr-2 h-7"
    >
      <div>
        <Menu.Button className="flex items-center text-sm font-light text-gray-500 dark:text-gray-300">
          Ordenar por:
          <span className="ml-1 font-semibold text-black dark:text-white">
            {value}
          </span>
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
        <Menu.Items className="absolute right-0 transition-colors duration-300 bg-white rounded-sm shadow-md dark:shadow-gray-500 dark:shadow-sm dark:bg-gray-700 shadow-gray-400 top-8 w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {() => (
              <button
                onClick={handleClick}
                className={`${
                  value === orderByValues.RECIENTES &&
                  ` border-l-2 border-gray-600 dark:border-white`
                } w-full pl-2 text-sm font-semibold text-left text-purple-600 md:text-sm dark:text-gray-200 py-1 mt-1 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800 `}
              >
                {orderByValues.RECIENTES}
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {() => (
              <button
                onClick={handleClick}
                className={`${
                  value === orderByValues.POPULARES &&
                  ` border-l-2 border-gray-600 dark:border-white`
                } w-full pl-2 text-sm font-semibold text-left text-purple-600 md:text-sm dark:text-gray-200 py-1 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800 `}
              >
                {orderByValues.POPULARES}
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OrderByLinks;
