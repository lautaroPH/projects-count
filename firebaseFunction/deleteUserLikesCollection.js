import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteUserLikesCollection = async (userId, id) => {
  const likeRef = query(
    collection(db, `users/${userId}/likes`),
    where('id', '==', id)
  );
  const documentSnapshot = await getDocs(likeRef);

  documentSnapshot.docs.map(async (like) => {
    await deleteDoc(doc(db, `users/${userId}/likes/${like.id}`));
  });
};
