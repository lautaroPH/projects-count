import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadUserLike = async (id, userId, dataUserLike) => {
  const { title, description, avatar } = dataUserLike;
  await setDoc(doc(db, 'users', userId, 'likes', id), {
    id,
    title,
    description,
    avatar,
    timestamp: serverTimestamp(),
  });
};
