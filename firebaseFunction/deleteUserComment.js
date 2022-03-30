import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteUserComment = async (commentId, userId) => {
  await deleteDoc(doc(db, 'users', userId, 'comments', commentId));
};
