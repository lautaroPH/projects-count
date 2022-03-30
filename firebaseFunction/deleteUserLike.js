import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteUserLike = async (id, userId) => {
  await deleteDoc(doc(db, 'users', userId, 'likes', id));
};
