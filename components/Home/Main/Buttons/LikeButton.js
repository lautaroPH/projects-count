import useUser from 'hooks/useUser';
import { useEffect, useState } from 'react';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { deleteLike } from 'firebaseFunction/deleteLike';
import { uploadLike } from 'firebaseFunction/uploadLike';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { swalUserNotLoggedDark } from 'swals/dark/swalUserNotLoggedDark';
import { swalUserNotLoggedLight } from 'swals/light/swalUserNotLoggedLight';

const LikeButton = ({
  id,
  likes,
  dataUserLike,
  links,
  setLinks,
  isOneLink,
}) => {
  const [hasLiked, setHasLiked] = useState(false);

  const user = useUser();
  const router = useRouter();
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(
    () => setHasLiked(likes?.findIndex((like) => like.id === user?.id) !== -1),
    [likes, user]
  );

  const likeLink = async () => {
    if (hasLiked) {
      await deleteLike(id, user?.id, likes.length);
    } else {
      await uploadLike(
        id,
        user,
        dataUserLike,
        links,
        setLinks,
        currentTheme,
        likes.length,
        isOneLink,
        router
      );
    }
  };

  return (
    <button
      onClick={
        user
          ? likeLink
          : currentTheme === 'dark'
          ? swalUserNotLoggedDark
          : swalUserNotLoggedLight
      }
      className="flex text-purple-700 transition-colors 
         mr-3 ease-in duration-300 hover:text-purple-800 cursor-pointer
         dark:text-white dark:hover:bg-[#282C34] hover:bg-gray-200 p-2 rounded "
    >
      {hasLiked ? (
        <HeartIconFilled className="h-6 mr-1" />
      ) : (
        <HeartIcon className="h-6 mr-1" />
      )}
      <span className="hidden sm:block md:hidden lg:block">Me gusta</span>
    </button>
  );
};

export default LikeButton;
