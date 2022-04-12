import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getAnswers = (id, commentId, callback) => {
  return onSnapshot(
    query(
      collection(db, 'links', id, 'comments', commentId, 'answers'),
      orderBy('timestamp', 'desc')
    ),
    (snapshot) => {
      callback(snapshot?.docs);
    }
  );
};
