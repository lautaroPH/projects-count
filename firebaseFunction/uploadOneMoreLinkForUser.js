import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getUser } from './getUser';

export const uploadOneMoreLinkForUser = (userId) => {
  getUser(userId).then(async (user) => {
    await updateDoc(doc(db, 'users', userId), {
      linksNumber: user?.linksNumber ? user?.linksNumber + 1 : 1,
    });
  });
};
