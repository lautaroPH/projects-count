import SkeletonLoaderUserLikes from 'components/Loaders/SkeletonLoaderUserLikes';
import { getUserLikes } from 'firebaseFunction/getUserLikes';
import useUser from 'hooks/useUser';
import { useState, useEffect } from 'react';
import UserLike from './UserLike';

const AsideActivityLikes = () => {
  const user = useUser();

  const [likes, setLikes] = useState([]);
  const [noLikes, setNoLikes] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getUserLikes(user.id, setLikes, setNoLikes);
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full mt-2 mb-2">
      <h5 className="text-base font-semibold text-center text-violet-600 dark:text-white">
        Te gustó
      </h5>
      {likes.length === 0 && !noLikes ? (
        <>
          <SkeletonLoaderUserLikes />
          <SkeletonLoaderUserLikes />
        </>
      ) : (
        likes.map((like, i) => (
          <UserLike
            id={like.id}
            i={i}
            title={like.data().title}
            avatar={like.data().avatar}
            description={like.data().description}
            likesLength={likes.length}
            key={like.id}
          />
        ))
      )}

      {noLikes && (
        <p className="w-full mt-1 text-sm text-center text-gray-400 dark:text-gray-300 dark:border-b-gray-800">
          No hay likes
        </p>
      )}
    </div>
  );
};

export default AsideActivityLikes;
