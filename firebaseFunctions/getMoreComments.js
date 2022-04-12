import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getMoreComments = (id, callback, callbackEmpty, lastComment) => {
  const querySnapshot = query(
    collection(db, 'links', id, 'comments'),
    orderBy('timestamp', 'desc'),
    limit(6),
    startAfter(lastComment)
  );

  getDocs(querySnapshot).then((snapshot) => {
    callbackEmpty(snapshot.empty);
    callback((comments) => [...comments, ...snapshot.docs]);
  });
};
