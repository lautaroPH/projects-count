import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getCommentsNumber = async (id) => {
  const querySnapshot = doc(db, 'links', id, 'allCommentsNumber', id);

  const commentRef = await getDoc(querySnapshot);

  return commentRef?.data()?.commentsNumber || 0;
};
