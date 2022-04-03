import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getAllComments = (id, callback) => {
  return onSnapshot(
    query(
      collection(db, 'links', id, 'comments'),
      orderBy('timestamp', 'desc')
    ),
    (snapshot) => {
      callback(snapshot?.docs);
    }
  );
};
