import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getUser } from './getUser';

export const deleteOneLinkNumberForUser = async (userId) => {
  getUser(userId).then(async (user) => {
    await updateDoc(doc(db, 'users', userId), {
      linksNumber: user?.linksNumber === 0 ? 0 : user.linksNumber - 1,
    });
  });
};
