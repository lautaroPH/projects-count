import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadOneMoreLikeForLink = async (id, likes, userId) => {
  await updateDoc(doc(db, 'links', id), {
    id: userId,
    allLikes: likes + 1,
  });
};
