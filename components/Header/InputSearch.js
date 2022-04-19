import { SearchIcon } from '@heroicons/react/solid';

const InputSearch = () => {
  return (
    <div className="relative p-3 mt-1 ml-20 rounded-md w-72">
      <form>
        <input
          className="w-full py-1 pl-2 text-gray-700 bg-transparent border border-gray-400 rounded-md pr-9 dark:text-gray-300 focus:outline-none focus:shadow-outlineml-20 dark:border-gray-500 "
          type="search"
          placeholder="Buscar..."
          // value={keyWord}
          // onChange={(e) => setKeyWord(e.target.value)}
        />
        <button
          type="submit"
          className="absolute flex items-center justify-center w-9 h-[33.5px] border-l border-violet-800 dark:border-gray-500 right-3 top-3 text-white dark:text-black bg-violet-800 dark:bg-white rounded-r-md hover:bg-transparent hover:text-violet-800 dark:hover:text-white dark:hover:bg-transparent transition-all ease-in-out duration-200"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default InputSearch;
