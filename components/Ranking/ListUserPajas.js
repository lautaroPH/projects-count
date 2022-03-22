const ListUserPajas = ({
  username,
  counter,
  index,
  id,
  avatar,
  userId,
  userIdOfCounterRank,
}) => {
  return (
    <tr
      key={id}
      className={`${
        userId === userIdOfCounterRank
          ? 'bg-yellow-300 dark:bg-yellow-600'
          : ' odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-slate-700 dark:even:bg-slate-800'
      }`}
    >
      <td className="px-2 py-2 font-bold">
        <p
          className="flex items-center ml-4 gap-4 text-blue-900 
          group align-middle dark:text-blue-200"
        >
          {index + 1}.
        </p>
      </td>
      <td className="px-2 py-2 font-bold">
        <p
          className="flex items-center gap-4 text-blue-900 
           group align-middle dark:text-blue-100"
        >
          <img className="w-8 h-8 rounded-3xl" src={avatar} />
          {username}
        </p>
      </td>
      <td className="px-2 py-2 font-bold">
        <p
          className="flex items-center gap-4 text-blue-900 
          group align-middle dark:text-gray-300"
        >
          {counter}
        </p>
      </td>
    </tr>
  );
};

export default ListUserPajas;
