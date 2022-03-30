import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getMoreComments = async (id, lastComment, callback) => {
  const querySnapshot = query(
    collection(db, 'links', id, 'comments'),
    orderBy('timestamp', 'desc'),
    startAfter(lastComment),
    limit(5)
  );

  getDocs(querySnapshot).then((snapshot) => {
    callback((comment) => [...comment, ...snapshot.docs]);
  });
};
