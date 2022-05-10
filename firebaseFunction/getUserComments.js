import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUserComments = (id, callbackDocs, callbackEmpty) => {
  return onSnapshot(
    query(
      collection(db, 'users', id, 'comments'),
      orderBy('timestamp', 'desc'),
      limit(3)
    ),
    ({ docs, empty }) => {
      callbackDocs(docs);
      callbackEmpty(empty);
    }
  );
};
