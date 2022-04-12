import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUserOnSpanshot = async (userId, callback) => {
  return onSnapshot(doc(db, 'users', userId), (snapshot) => {
    callback(snapshot?.data());
  });
};
