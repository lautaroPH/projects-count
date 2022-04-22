import { useEffect, useState } from 'react';
import ListUserRank from './ListUserRank';
import TableHead from './TableHead';
import useUser from 'hooks/useUser';
import SkeletonLoaderRanking from '../Loaders/SkeletonLoaderRanking';
import { getUsers } from 'firebaseFunction/getUsers';

const MainRanking = () => {
  const [userRanks, setUserRanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();

  useEffect(() => getUsers(setUserRanks, setIsLoading, 40), []);

  return (
    <>
      {isLoading ? (
        <SkeletonLoaderRanking />
      ) : (
        <div className="px-4 pt-4 pb-20">
          <div className="flex justify-center">
            <table className="w-full overflow-hidden rounded-lg table-auto max-w-prose">
              <TableHead />
              <tbody>
                {userRanks.length > 0 &&
                  userRanks.map((userRank, index) => (
                    <ListUserRank
                      key={userRank.id}
                      username={userRank.data().username}
                      linksNumber={userRank.data().linksNumber}
                      id={userRank.id}
                      userId={user?.id}
                      index={index}
                      avatar={userRank.data().avatar}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MainRanking;
