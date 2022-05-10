import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUserLikes = async (id, callbackDocs, callbackEmpty) => {
  return onSnapshot(
    query(
      collection(db, 'users', id, 'likes'),
      orderBy('timestamp', 'desc'),
      limit(3)
    ),
    ({ docs, empty }) => {
      callbackDocs(docs);
      callbackEmpty(empty);
    }
  );
};
