import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteAnswerCollection } from './deleteAnswerCollection';

export const deleteCommentCollection = async (id) => {
  const commentRef = collection(db, `links/${id}/comments`);
  const documentSnapshot = await getDocs(commentRef);

  documentSnapshot.docs.map(async (comment) => {
    await deleteAnswerCollection(id, comment.id);
    await deleteDoc(doc(db, `links/${id}/comments/${comment.id}`));
  });
};
