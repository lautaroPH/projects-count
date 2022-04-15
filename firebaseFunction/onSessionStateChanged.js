import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "firebaseMain/firebase";

export const mapUserFromFirebaseAuthToUser = (user) => {
  if (user !== null && user !== undefined) {
    const { displayName, email, photoURL, uid } = user;
    const nameEmail = email.split("@")[0];
    return {
      avatar: photoURL,
      username: displayName ? displayName : nameEmail,
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
