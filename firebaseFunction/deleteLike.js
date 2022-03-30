import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteUserLike } from './deleteUserLike';

export const deleteLike = async (id, userId) => {
  await deleteDoc(doc(db, 'links', id, 'likes', userId));

  deleteUserLike(id, userId);
};
