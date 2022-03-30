import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'firebaseMain/firebase';

const mapUserFromFirebaseAuthToUser = (user) => {
  if (user !== null && user !== undefined) {
    const { displayName, email, photoURL, uid } = user;

    return {
      avatar: photoURL,
      username: displayName,
      email,
      id: uid,
    };
  }
};

export const onSessionStateChanged = (onChange) => {
  return onAuthStateChanged(authentication, (user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};
