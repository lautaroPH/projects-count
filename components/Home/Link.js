import { useDateTimeFormat } from 'hooks/useDateTimeFormat';
import { useTimeAgo } from 'hooks/useTimeAgo';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';
import ButtonDelete from './ButtonDelete';
import Image from 'next/image';
import LikesCommentsNumber from './LikesCommentsNumber';
import AllButtons from './AllButtons';
import Tecnologies from './Tecnologies';
import { getLikes } from 'firebaseMain/firebaseFunction';
import SkeletonLoaderButtonsLinks from 'components/Loaders/SkeletonLoaderButtonsLinks';

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
  const [likes, setLikes] = useState(null);

  useEffect(() => getLikes(id, setLikes), [id]);

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
        className="overflow-hidden w-full border-gray-100 rounded-xl 
      bg-white mb-2 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="flex justify-between">
          <div className="flex pt-3 pl-3 items-center">
            <div className="h-14 w-14">
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
              <h4 className="text-xl">{username}</h4>
              <p className="text-sm font-light">
                <time title={createdAtFormated}>{timeago}</time>
              </p>
            </div>
          </div>
          {userId === user?.id && (
            <p className="pt-3 pr-3">
              <ButtonDelete id={id} image={image} />
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
        {likes ? (
          <>
            <LikesCommentsNumber likes={likes} username={user?.username} />

            <AllButtons
              id={id}
              likes={likes}
              githubRepo={githubRepo}
              link={link}
            />
          </>
        ) : (
          <SkeletonLoaderButtonsLinks />
        )}
      </div>
    </>
  );
};

export default Link;
