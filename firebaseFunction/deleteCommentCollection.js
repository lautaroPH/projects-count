import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteCommentCollection = async (id) => {
  const commentRef = collection(db, `links/${id}/comments`);
  const documentSnapshot = await getDocs(commentRef);

  documentSnapshot.docs.map(async (comment) => {
    await deleteDoc(doc(db, `links/${id}/comments/${comment.id}`));
  });
};
