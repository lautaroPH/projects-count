import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getOneComment = async (id, commentId) => {
  const querySnapshot = doc(db, 'links', id, 'comments', commentId);

  const commentRef = await getDoc(querySnapshot);

  if (commentRef.data()) {
    return commentRef;
  } else {
    throw new Error('No existe el comentario');
  }
};
