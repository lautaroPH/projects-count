import Image from 'next/image';
import Link from 'next/link';
const UserLike = ({ id, title, avatar, description, i, likesLength }) => {
  const titleWithUppercase = title.charAt(0).toUpperCase() + title.slice(1);
  const descriptionWithUppercase =
    description.charAt(0).toUpperCase() + description.slice(1);
  return (
    <div
      key={id}
      className={`${
        likesLength - 1 !== i && `border-b-2 dark:border-b-gray-800`
      } flex pb-2 mt-2 `}
    >
      <div className="w-10 h-10 mt-1 mr-2">
        <Image
          src={avatar}
          alt={title}
          height={150}
          width={150}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <Link passHref href={`/link/${id}`}>
          <a>
            <h2 className="font-semibold hover:underline">
              {titleWithUppercase}
            </h2>
          </a>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {descriptionWithUppercase.length > 60 ? (
            <>{descriptionWithUppercase.substring(0, 60)}...</>
          ) : (
            <>{descriptionWithUppercase}</>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserLike;
