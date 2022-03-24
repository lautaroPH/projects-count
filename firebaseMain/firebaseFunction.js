import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';
import { authentication, db, storage } from './firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import Swal from 'sweetalert2';
import {
  swalUploadingLinkDark,
  swalUploadingLinkLight,
  swalUploadLinkSuccessDark,
  swalUploadLinkSuccessLight,
} from 'swals/swalsComponents';

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
  currentTheme === 'dark'
    ? Swal.fire(swalUploadingLinkDark(title))
    : Swal.fire(swalUploadingLinkLight(title));

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

  currentTheme === 'dark'
    ? Swal.fire(swalUploadLinkSuccessDark(title))
    : Swal.fire(swalUploadLinkSuccessLight(title));
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

const getLinks = (callbackNoLink, callbackLinks) => {
  return onSnapshot(
    query(collection(db, 'links'), orderBy('timestamp', 'desc'), limit(30)),
    (snapshot) => {
      callbackNoLink(snapshot.empty);
      callbackLinks(snapshot.docs);
    }
  );
};

const deleteLike = async (id, user) => {
  const { id: userId } = user;
  await deleteDoc(doc(db, 'links', id, 'likes', userId));
};

const uploadLike = async (id, user) => {
  const { id: userId, username } = user;
  await setDoc(doc(db, 'links', id, 'likes', userId), {
    id: userId,
    username,
    timestamp: serverTimestamp(),
  });
};

const getLikes = (id, callback) => {
  return onSnapshot(
    query(collection(db, 'links', id, 'likes'), orderBy('timestamp', 'desc')),
    (snapshot) => {
      callback(snapshot?.docs);
    }
  );
};

const deleteLink = async (id, image) => {
  await deleteDoc(doc(db, 'links', id));
  const likeRef = collection(db, `links/${id}/likes`);
  const documentSnapshot = await getDocs(likeRef);

  documentSnapshot.docs.map(async (like) => {
    await deleteDoc(doc(db, `links/${id}/likes/${like.id}`));
  });

  if (image) {
    const desertRef = ref(storage, `links/${id}/image`);
    deleteObject(desertRef);
  }
};

export {
  logout,
  loginWithGithub,
  onSessionStateChanged,
  uploadLink,
  deleteLike,
  uploadLike,
  deleteLink,
  getLikes,
  getLinks,
};
