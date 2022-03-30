import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadUserLike = async (id, userId, dataUserLike) => {
  const { title, link, description, timestamp, avatar, username } =
    dataUserLike;
  await setDoc(doc(db, 'users', userId, 'likes', id), {
    id,
    title,
    link,
    description,
    timestampLink: timestamp,
    avatar,
    username,
    timestamp: serverTimestamp(),
  });
};
