import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const editUserComment = async (userId, commentId, comment) => {
  await updateDoc(doc(db, 'users', userId, 'comments', commentId), {
    comment,
    isEdited: true,
  });
};
