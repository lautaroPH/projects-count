import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'firebaseMain/firebase';
import ListUserPajas from './ListUserPajas';
import TableHead from './TableHead';
import useUser from 'hooks/useUser';
import SkeletonLoaderRanking from '../Loaders/SkeletonLoaderRanking';

const MainRanking = () => {
  const [counterRanks, setCounterRanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const user = useUser();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'counters'), orderBy('counter', 'desc')),
        (snapshot) => {
          setIsEmpty(snapshot.empty);
          setIsLoading(false);
          setCounterRanks(snapshot.docs);
        }
      ),
    []
  );

  return (
    <>
      {isLoading ? (
        <SkeletonLoaderRanking />
      ) : !isEmpty ? (
        <div className="pt-4 pb-20 px-4">
          <div className="flex justify-center">
            <table className="w-full overflow-hidden rounded-lg table-auto max-w-prose">
              <TableHead />
              <tbody>
                {counterRanks.map((counterRank, index) => (
                  <ListUserPajas
                    key={counterRank.id}
                    username={counterRank.data().username}
                    counter={counterRank.data().counter}
                    userIdOfCounterRank={counterRank.data().id}
                    id={counterRank.id}
                    userId={user?.id}
                    index={index}
                    avatar={counterRank.data().avatar}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className="text-red-700">No hay usuarios que mostrar</h1>
      )}
    </>
  );
};

export default MainRanking;
