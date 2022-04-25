const TableHead = () => {
  return (
    <thead className="bg-gray-300 dark:bg-gray-900">
      <tr>
        <th className="py-2 pl-6 font-normal text-left text-violet-700 dark:text-white">
          Usuarios
        </th>
        <th className="px-4 py-2 font-normal text-violet-700 dark:text-white">
          Proyectos
        </th>
        <th className="py-2 pr-5 font-normal text-right text-violet-700 dark:text-white">
          Top
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
