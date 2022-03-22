import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';
import { authentication, db, storage } from './firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Swal from 'sweetalert2';

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

const onSessionStateChanged = (onChange) => {
  return onAuthStateChanged(authentication, (user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

const loginWithGithub = () => {
  const GithubProvider = new GithubAuthProvider();
  return signInWithPopup(authentication, GithubProvider);
};

const logout = () => {
  signOut(authentication);
};

const uploadLink = async (
  { title, link, githubRepo, tecnologies, description },
  selectedFile,
  user,
  currentTheme
) => {
  if (currentTheme === 'dark') {
    Swal.fire({
      imageUrl:
        'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1647967168/Dual_Ring-1s-200px_1_wl4kwa.gif',
      imageHeight: 80,
      imageWidth: 80,
      background: 'rgb(17 24 39)',
      color: '#fff',
      title: `Guardando proyecto: "${title}"`,
      text: 'Esto podria demorar unos segundos',
    });
  } else {
    Swal.fire({
      imageUrl:
        'https://res.cloudinary.com/dv1ksnrvk/image/upload/v1647907326/Dual_Ring-1s-200px_j4unt1.gif',
      imageHeight: 80,
      imageWidth: 80,
      title: `Guardando proyecto: "${title}"`,
      text: 'Esto podria demorar unos segundos',
    });
  }
  const docRef = await addDoc(collection(db, 'links'), {
    title,
    link,
    githubRepo,
    tecnologies,
    description,
    username: user?.username,
    email: user?.email,
    id: user?.id,
    userImage: user?.avatar,
    timestamp: serverTimestamp(),
  });

  const id = docRef.id;
  if (selectedFile) {
    await uploadImage(selectedFile, id);
  }

  if (currentTheme === 'dark') {
    Swal.fire({
      icon: 'success',
      background: 'rgb(17 24 39)',
      color: '#fff',
      title: `${title} guardado correctamente`,
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: `${title} guardado correctamente`,
    });
  }
};

const uploadImage = async (selectedFile, id) => {
  const imageRef = ref(storage, `links/${id}/image`);

  await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, 'links', id), {
      image: downloadURL,
    });
  });
};

const deleteLike = async ({ id, user }) => {
  const { id: userId } = user;
  await deleteDoc(doc(db, 'links', id, 'likes', userId));
};

const uploadLike = async ({ id, user }) => {
  const { id: userId, username } = user;
  await setDoc(doc(db, 'links', id, 'likes', userId), {
    id: userId,
    username,
    timestamp: serverTimestamp(),
  });
};

const deleteLink = async ({ id }) => {
  await deleteDoc(doc(db, 'links', id));
};

export {
  logout,
  loginWithGithub,
  onSessionStateChanged,
  uploadLink,
  deleteLike,
  uploadLike,
  deleteLink,
};
