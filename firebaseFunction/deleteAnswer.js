import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteAnswer = async (linkId, commentId, answerId) => {
  await deleteDoc(
    doc(db, 'links', linkId, 'comments', commentId, 'answers', answerId)
  );
};
