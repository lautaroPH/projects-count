import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUserLinks = (
  userId,
  callback,
  callbackLoading,
  callbackEmpty
) => {
  return onSnapshot(
    query(
      collection(db, 'links'),
      where('id', '==', userId),
      orderBy('timestamp', 'desc')
    ),
    ({ docs, empty }) => {
      callback(docs);
      callbackLoading(false);
      callbackEmpty(empty);
    }
  );
};
