import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadAnswer = async (id, user, answer, commentId) => {
  const { id: userId, username, avatar } = user;
  const answerTrim = answer.trim();

  await addDoc(collection(db, 'links', id, 'comments', commentId, 'answers'), {
    userId,
    username,
    avatar,
    answer: answerTrim,
    commentId,
    timestamp: serverTimestamp(),
  });
};
