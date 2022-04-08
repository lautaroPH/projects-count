import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getLastCommentUpload = async (id, commentId, setComments) => {
  const querySnapshot = doc(db, 'links', id, 'comments', commentId);

  const commentRef = await getDoc(querySnapshot);

  setComments((comment) => [commentRef, ...comment]);
};
