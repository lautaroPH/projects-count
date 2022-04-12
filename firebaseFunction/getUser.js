import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUser = async (userId) => {
  const querySnapshot = doc(db, 'users', userId);

  const userRef = await getDoc(querySnapshot);

  return userRef?.data() || null;
};
