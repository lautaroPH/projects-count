import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { editUserComment } from './editUserComment';

export const editComment = async (linkId, commentId, comment, userId) => {
  await updateDoc(doc(db, 'links', linkId, 'comments', commentId), {
    comment: comment.trim(),
    isEdited: true,
  });

  editUserComment(userId, commentId, comment.trim());
};
