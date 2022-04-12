import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getUser } from './getUser';

export const uploadUser = async (userId, username, avatar, email) => {
  getUser(userId).then(async (user) => {
    await setDoc(doc(db, 'users', userId), {
      linksNumber: user?.linksNumber ? user?.linksNumber + 1 : 1,
      username,
      avatar,
      id: userId,
      email,
    });
  });
};
