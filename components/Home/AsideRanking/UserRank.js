import Image from 'next/image';
import Link from 'next/link';
const UserRank = ({ id, username, avatar, linksNumber }) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between pt-2 pb-2 border-b-2 dark:border-b-gray-800"
    >
      <div className="flex items-center">
        <div className="rounded-full h-9 w-9">
          <Image
            height={36}
            width={36}
            layout="responsive"
            className="rounded-full h-9 w-9"
            src={avatar}
            alt="user avatar"
            priority={true}
          />
        </div>
        <Link passHref href={`/usuario/${id}`}>
          <a>
            <h4 className="ml-2 font-semibold hover:underline">{username}</h4>
          </a>
        </Link>
      </div>
      <p>{linksNumber}</p>
    </div>
  );
};

export default UserRank;
