import Image from 'next/image';
import Link from 'next/link';

const ListUserRank = ({ username, linksNumber, index, id, avatar, userId }) => {
  return (
    <tr
      key={id}
      className={`${
        userId === id
          ? 'bg-yellow-300 dark:bg-yellow-600'
          : ' odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-slate-700 dark:even:bg-slate-800'
      }`}
    >
      <td className="px-2 py-2 font-bold">
        <p className="flex items-center gap-4 ml-4 text-blue-900 align-middle dark:text-blue-200">
          {index + 1}.
        </p>
      </td>
      <td className="px-2 py-2 font-bold">
        <div className="flex items-center gap-4 text-blue-900 align-middle dark:text-blue-100">
          <div className="w-8 h-8">
            {avatar && (
              <Image
                className="rounded-full"
                src={avatar}
                alt="User avatar"
                width={32}
                height={32}
                layout="responsive"
              />
            )}
          </div>
          <Link href="/user/[username]" as={`/user/${username}`}>
            <a className="hover:underline">{username}</a>
          </Link>
        </div>
      </td>
      <td className="px-2 py-2 font-bold">
        <p className="flex items-center gap-4 text-blue-900 align-middle dark:text-gray-300">
          {linksNumber}
        </p>
      </td>
    </tr>
  );
};

export default ListUserRank;
