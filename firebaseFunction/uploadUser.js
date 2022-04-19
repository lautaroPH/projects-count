import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getUser } from './getUser';
import { mapUserFromFirebaseAuthToUser } from './onSessionStateChanged';

export const uploadUser = async (userLogin) => {
  const { username, avatar, id, email } =
    mapUserFromFirebaseAuthToUser(userLogin);

  getUser(id).then(async (userFromDatabase) => {
    if (!userFromDatabase) {
      await setDoc(doc(db, 'users', id), {
        username,
        avatar,
        id,
        email,
        linksNumber: 0,
        profession: '',
        aboutMe: '',
      });
    }
  });
};
