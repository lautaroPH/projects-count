import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadUserProfile = async (userId, aboutMe, profession) => {
  await updateDoc(doc(db, 'users', userId), {
    aboutMe,
    profession,
  });
};
