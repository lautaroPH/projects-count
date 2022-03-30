import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteUserLink = async (id, userId) => {
  await deleteDoc(doc(db, 'users', userId, 'links', id));
};
