import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getComments = (id, callback, callbackEmpty) => {
  const querySnapshot = query(
    collection(db, 'links', id, 'comments'),
    orderBy('timestamp', 'desc'),
    limit(6)
  );

  getDocs(querySnapshot).then((snapshot) => {
    callbackEmpty(snapshot.empty);
    callback(snapshot.docs);
  });
};
