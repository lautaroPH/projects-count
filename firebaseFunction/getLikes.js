import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getLikes = (id, callback) => {
  return onSnapshot(
    query(collection(db, 'links', id, 'likes'), orderBy('timestamp', 'desc')),
    (snapshot) => {
      callback(snapshot?.docs);
    }
  );
};
