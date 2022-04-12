import { signOut } from 'firebase/auth';
import { authentication } from 'firebaseMain/firebase';

export const logout = () => {
  signOut(authentication);
};
