import { getUsers } from 'firebaseFunction/getUsers';
import { useEffect, useState } from 'react';
import UserRank from './UserRank';
import Link from 'next/link';
import SkeletonLoaderAsideRanking from 'components/Loaders/SkeletonLoaderAsideRanking';

const AsideRanking = () => {
  const [usersRanks, setUsersRanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => getUsers(setUsersRanks, setIsLoading, 5), []);

  return (
    <div className="px-5 bg-white rounded-xl w-80 dark:bg-gray-900">
      <h2 className="pt-2 text-xl text-center text-violet-700 dark:text-white">
        Ranking
      </h2>
      {!isLoading ? (
        usersRanks.map((userRank) => (
          <UserRank
            key={userRank.id}
            id={userRank.id}
            username={userRank.data().username}
            avatar={userRank.data().avatar}
            linksNumber={userRank.data().linksNumber}
          />
        ))
      ) : (
        <>
          <SkeletonLoaderAsideRanking />
          <SkeletonLoaderAsideRanking />
          <SkeletonLoaderAsideRanking />
        </>
      )}
      <div className="py-2 text-center">
        <Link passHref href="/ranking">
          <a className="text-sm text-violet-600 dark:text-white hover:underline">
            Ver todo
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AsideRanking;
