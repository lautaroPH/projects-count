import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getComments = (id, callback) => {
  return onSnapshot(
    query(
      collection(db, 'links', id, 'comments'),
      orderBy('timestamp', 'desc'),
      limit(5)
    ),
    (snapshot) => {
      callback(snapshot.docs);
    }
  );
};
