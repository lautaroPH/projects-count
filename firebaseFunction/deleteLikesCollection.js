import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteLikesCollection = async (id) => {
  const likeRef = collection(db, `links/${id}/likes`);
  const documentSnapshot = await getDocs(likeRef);

  documentSnapshot.docs.map(async (like) => {
    await deleteDoc(doc(db, `links/${id}/likes/${like.id}`));
  });
};
