import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadUserProfession = async (userId, profession) => {
  await updateDoc(doc(db, 'users', userId), {
    profession,
  });
};
