import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadUserComment = async (
  id,
  userId,
  comment,
  title,
  commentId
) => {
  await setDoc(doc(db, 'users', userId, 'comments', commentId), {
    id,
    comment,
    title,
    timestamp: serverTimestamp(),
  });
};
