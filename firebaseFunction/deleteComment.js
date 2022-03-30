import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteUserComment } from './deleteUserComment';

export const deleteComment = async (linkId, commentId, userId) => {
  await deleteDoc(doc(db, 'links', linkId, 'comments', commentId));

  deleteUserComment(commentId, userId);
};
