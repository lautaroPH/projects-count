import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { authentication } from 'firebaseMain/firebase';

export const loginWithGithub = () => {
  const GithubProvider = new GithubAuthProvider();
  return signInWithPopup(authentication, GithubProvider);
};
