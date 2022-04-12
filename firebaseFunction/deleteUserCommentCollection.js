import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteUserCommentCollection = async (userId, id) => {
  const commentRef = query(
    collection(db, `users/${userId}/comments`),
    where('id', '==', id)
  );
  const documentSnapshot = await getDocs(commentRef);

  documentSnapshot.docs.map(async (comment) => {
    await deleteDoc(doc(db, `users/${userId}/comments/${comment.id}`));
  });
};
