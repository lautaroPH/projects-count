import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteCommentNumbers = async (linkId) => {
  await deleteDoc(doc(db, 'links', linkId, 'allCommentsNumber', linkId));
};
