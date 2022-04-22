import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUsers = (callback, setIsLoading, limitUsers) => {
  return onSnapshot(
    query(
      collection(db, 'users'),
      orderBy('linksNumber', 'desc'),
      limit(limitUsers)
    ),
    ({ docs }) => {
      callback(docs);
      setIsLoading(false);
    }
  );
};
