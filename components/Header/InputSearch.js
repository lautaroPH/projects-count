import { SearchIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useRouter } from 'next/router';

const InputSearch = () => {
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
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  return (
    <div className="p-3 mt-1 ml-10 w-72">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          className="w-full px-2 py-1 text-gray-700 bg-transparent border border-gray-400 rounded-full dark:text-gray-300 focus:outline-none focus:shadow-outlineml-20 dark:border-gray-500 "
          type="search"
          placeholder="Buscar..."
          onChange={handleChange}
          value={keyword}
        />
      </form>
    </div>
  );
};

export default InputSearch;
