import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { uploadUserComment } from './uploadUserComment';

export const uploadComment = async (id, user, comment, title) => {
  const { id: userId, username, avatar } = user;
  const commentTrim = comment.trim();
  const commentRef = await addDoc(collection(db, 'links', id, 'comments'), {
    userId,
    username,
    avatar,
    comment: commentTrim,
    timestamp: serverTimestamp(),
  });

  uploadUserComment(id, userId, comment, title, commentRef.id);
};
