import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import Tecnologies from './Tecnologies';
import ButtonDelete from './Buttons/ButtonDelete';
import Footer from './Footer';

//TODO: intentar hacer que se muestre quien le da like con las caritas

const Link = ({
  title,
  link,
  description,
  id,
  userId,
  timestamp,
  githubRepo,
  tecnologies,
  avatar,
  image,
  username,
}) => {
  const dataUserLike = {
    title,
    link,
    description,
    timestamp,
    avatar,
    username,
  };

  if (timestamp !== null) {
    const createdAt = new Date(parseInt(timestamp?.seconds * 1000));
  }
  const timeago = useTimeAgo(createdAt !== undefined && createdAt);
  const createdAtFormated = useDateTimeFormat(
    createdAt !== undefined && createdAt
  );
  const user = useUser();

  const titleWithUppercase = title.charAt(0).toUpperCase() + title.slice(1);
  const descriptionWithUppercase =
    description.charAt(0).toUpperCase() + description.slice(1);

  const tecnologiesArray = tecnologies?.split(',');

  return (
    <>
      <div
        key={id}
        className="overflow-hidden border-gray-100 sm:rounded-xl 
      bg-white border-b border-b-gray-300 sm:border-none sm:mb-2 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex justify-between">
          <div className="flex pt-3 pl-3 items-center">
            <div className="h-10 w-10 sm:h-14 sm:w-14">
              {avatar && (
                <Image
                  className="rounded-full"
                  src={avatar}
                  height={56}
                  width={56}
                  layout="responsive"
                  alt={username}
                />
              )}
            </div>

            <div className="ml-2">
              <h4 className="sm:text-xl text-base">{username}</h4>
              <p className="text-xs sm:text-sm font-light mb-1">
                <time title={createdAtFormated}>{timeago}</time>
              </p>
            </div>
          </div>
          {userId === user?.id && (
            <p className="pt-3 pr-3">
              <ButtonDelete id={id} image={image} userId={user?.id} />
            </p>
          )}
        </div>

        <div className="pl-4 mt-2">
          <h3 className=" dark:text-gray-50 text-xl font-bold mb-2">
            {titleWithUppercase}
          </h3>

          <p className=" dark:text-gray-200 mb-2 pr-3">
            {descriptionWithUppercase}
          </p>

          {tecnologies && <Tecnologies tecnologiesArray={tecnologiesArray} />}
        </div>

        {image && (
          // <div className="h-full w-full relative">
          //   <Image
          //     src={image}
          //     layout="fill"
          //     alt={title}
          //     objectFit="contain"
          //   />
          // </div>
          <div>
            <img src={image} className="h-auto w-full" alt={title} />
          </div>
        )}

        <Footer
          id={id}
          username={username}
          dataUserLike={dataUserLike}
          githubRepo={githubRepo}
          link={link}
          title={title}
        />
      </div>
    </>
  );
};

export default Link;
