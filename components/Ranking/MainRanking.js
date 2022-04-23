import { useEffect, useState, useRef } from 'react';
import ListUserRank from './ListUserRank';
import TableHead from './TableHead';
import useUser from 'hooks/useUser';
import SkeletonLoaderRanking from '../Loaders/SkeletonLoaderRanking';
import { getUsers } from 'firebaseFunction/getUsers';
import useNearScreen from 'hooks/useNearScreen';
import { getMoreUsers } from 'firebaseFunction/getMoreUsers';
import links from 'pages/api/links';

const MainRanking = () => {
  const [userRanks, setUserRanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMoreUsers, setIsLoadingMoreUsers] = useState(false);
  const [noMoreUsers, setNoMoreUsers] = useState(false);

  const user = useUser();
  const externalRef = useRef();
  const { isNearScreen } = useNearScreen({
    externalRef: !userRanks ? null : externalRef,
    once: false,
  });

  useEffect(() => getUsers(setUserRanks, setIsLoading, 35), []);

  // useEffect(() => {
  //   if (isNearScreen && !isLoadingMoreUsers && !noMoreUsers && links) {
  //     setIsLoadingMoreUsers(true);
  //     const lastVisible = userRanks[userRanks.length - 1];
  //     console.log(lastVisible);
  //     // getMoreUsers(
  //     //   setUserRanks,
  //     //   setIsLoadingMoreUsers,
  //     //   35,
  //     //   lastVisible,
  //     //   setNoMoreUsers
  //     // );
  //   }
  // }, [isNearScreen, isLoadingMoreUsers, userRanks, noMoreUsers]);

  console.log(isNearScreen);

  return (
    <>
      {isLoading ? (
        <SkeletonLoaderRanking />
      ) : (
        <>
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
          <div id="visor" ref={externalRef}></div>
        </>
      )}
    </>
  );
};

export default MainRanking;
