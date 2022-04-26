import Image from 'next/image';
import Link from 'next/link';

const ListUserRank = ({ username, linksNumber, index, id, avatar, userId }) => {
  return (
    <tr
      key={id}
      className={`${
        userId === id
          ? 'bg-violet-300 dark:bg-violet-600'
          : ' odd:bg-slate-200 even:bg-slate-300 dark:odd:bg-slate-700 dark:even:bg-slate-800'
      }`}
    >
      <td className="px-2 py-2 font-bold">
        <Link href={`/usuario/${id}`}>
          <a>
            <div className="flex items-center gap-4 align-middle dark:text-white">
              <div className="w-8 h-8">
                {avatar && (
                  <Image
                    className="rounded-full"
                    src={avatar}
                    alt="User avatar"
                    width={32}
                    height={32}
                    layout="responsive"
                    priority={index <= 20}
                  />
                )}
              </div>

              <p className="hover:underline">{username}</p>
            </div>
          </a>
        </Link>
      </td>
      <td className="px-2 py-2 font-bold">
        <p className="flex items-center justify-center gap-4 align-middle dark:text-white">
          {linksNumber}
        </p>
      </td>
      <td className="px-2 py-2 font-bold">
        <p className="flex items-center justify-center gap-4 ml-4 align-middle dark:text-white text-violet-700">
          {index + 1}
        </p>
      </td>
    </tr>
  );
};

export default ListUserRank;
