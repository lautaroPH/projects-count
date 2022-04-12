import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteOneLikeNumberForLink = async (id, likes) => {
  await updateDoc(doc(db, 'links', id), {
    allLikes: likes - 1,
  });
};
