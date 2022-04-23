import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getMoreUsers = (
  callback,
  setIsLoading,
  limitUsers,
  lastVisible,
  noMoreUsers
) => {
  return onSnapshot(
    query(
      collection(db, 'users'),
      orderBy('linksNumber', 'desc'),
      limit(limitUsers),
      startAfter(lastVisible)
    ),
    ({ docs, empty }) => {
      callback((users) => [...users, ...docs].flat(1));
      setIsLoading(false);
      noMoreUsers(empty);
    }
  );
};
