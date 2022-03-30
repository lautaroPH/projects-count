import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { uploadUserLike } from './uploadUserLike';

export const uploadLike = async (id, user, dataUserLike) => {
  const { id: userId, username } = user;
  await setDoc(doc(db, 'links', id, 'likes', userId), {
    id: userId,
    username,
    timestamp: serverTimestamp(),
  });

  uploadUserLike(id, userId, dataUserLike);
};
