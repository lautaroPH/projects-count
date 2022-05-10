import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { authentication, db } from 'firebaseMain/firebase';

export const uploadUserProfile = async (
  userId,
  aboutMe,
  profession,
  portfolio
) => {
  await updateDoc(doc(db, 'users', userId), {
    id: userId,
    aboutMe,
    profession,
    portfolio,
  });
};
