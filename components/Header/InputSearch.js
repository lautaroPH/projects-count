import { useState } from 'react';
import { useRouter } from 'next/router';

const InputSearch = ({ searchMobile, setsearchMobile }) => {
  const router = useRouter();
  const query = router.query.keyword || '';
  const [keyword, setKeyword] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword !== '') {
      router.push({
        pathname: '/inicio',
        query: { keyword },
      });
      setsearchMobile(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  return (
    <div className="w-full ml-4 lg:p-3 sm:mt-1 xl:ml-10 sm:ml-0 sm:w-6/12 lg:w-72">
      {searchMobile && (
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input
            className="w-full px-2 py-1 text-gray-700 bg-transparent border border-gray-400 rounded-full dark:text-gray-300 focus:outline-none focus:shadow-outlineml-20 dark:border-gray-500 "
            type="search"
            placeholder="Buscar..."
            onChange={handleChange}
            value={keyword}
            autoFocus={true}
          />
        </form>
      )}

      <form className="items-center hidden lg:flex" onSubmit={handleSubmit}>
        <input
          className="w-full px-2 py-1 text-gray-700 bg-transparent border border-gray-400 rounded-full dark:text-gray-300 focus:outline-none focus:shadow-outlineml-20 dark:border-gray-500 "
          type="search"
          placeholder="Buscar..."
          onChange={handleChange}
          value={keyword}
          autoFocus={true}
        />
      </form>
    </div>
  );
};

export default InputSearch;
