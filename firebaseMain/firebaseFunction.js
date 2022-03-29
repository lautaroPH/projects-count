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

const uploadLink = async (values, selectedFile, user) => {
  const { title, link, githubRepo, tecnologies, description } = values;
  const titleTrimmed = title.trim();
  const linkTrimmed = link.trim();
  const descriptionTrimmed = description.trim();
  const githubRepoTrimmed = githubRepo.trim();
  const tecnologiesTrimmed = tecnologies.trim();

  const dataToSave = {
    title: titleTrimmed,
    link: linkTrimmed,
    githubRepo: githubRepoTrimmed,
    tecnologies: tecnologiesTrimmed,
    description: descriptionTrimmed,
    username: user?.username,
    email: user?.email,
    id: user?.id,
    userImage: user?.avatar,
    timestamp: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'links'), dataToSave);

  const id = docRef.id;

  uploadUserLink(user?.id, id, values);

  if (selectedFile) {
    await uploadImage(selectedFile, id, user?.id);
  }
};

const uploadUserLink = async (userId, id, values) => {
  const { title, link, githubRepo, tecnologies, description } = values;
  const titleTrimmed = title.trim();
  const linkTrimmed = link.trim();
  const descriptionTrimmed = description.trim();
  const githubRepoTrimmed = githubRepo.trim();
  const tecnologiesTrimmed = tecnologies.trim();

  const dataToSaveUserLink = {
    title: titleTrimmed,
    link: linkTrimmed,
    githubRepo: githubRepoTrimmed,
    tecnologies: tecnologiesTrimmed,
    description: descriptionTrimmed,
    timestamp: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', userId, 'links', id), dataToSaveUserLink);
};

const uploadImage = async (selectedFile, id, userId) => {
  const imageRef = ref(storage, `links/${id}/image`);

  await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, `links`, id), { image: downloadURL });
    await updateDoc(doc(db, 'users', userId, 'links', id), {
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

const deleteLink = async (id, image, userId) => {
  await deleteDoc(doc(db, 'links', id));
  if (image) {
    deleteImageStorage(id);
  }
  deleteUserLink(id, userId);
  deleteLikesCollection(id);
  deleteCommentCollection(id);
};

const deleteImageStorage = async (id) => {
  const desertRef = ref(storage, `links/${id}/image`);
  deleteObject(desertRef);
};

const deleteUserLink = async (id, userId) => {
  await deleteDoc(doc(db, 'users', userId, 'links', id));
};

const deleteLikesCollection = async (id) => {
  const likeRef = collection(db, `links/${id}/likes`);
  const documentSnapshot = await getDocs(likeRef);

  documentSnapshot.docs.map(async (like) => {
    await deleteDoc(doc(db, `links/${id}/likes/${like.id}`));
  });
};

const deleteCommentCollection = async (id) => {
  const commentRef = collection(db, `links/${id}/comments`);
  const documentSnapshot = await getDocs(commentRef);

  documentSnapshot.docs.map(async (comment) => {
    await deleteDoc(doc(db, `links/${id}/comments/${comment.id}`));
  });
};

const deleteLike = async (id, userId) => {
  await deleteDoc(doc(db, 'links', id, 'likes', userId));

  deleteUserLike(id, userId);
};

const deleteUserLike = async (id, userId) => {
  await deleteDoc(doc(db, 'users', userId, 'likes', id));
};

const uploadLike = async (id, user, dataUserLike) => {
  const { id: userId, username } = user;
  await setDoc(doc(db, 'links', id, 'likes', userId), {
    id: userId,
    username,
    timestamp: serverTimestamp(),
  });

  uploadUserLike(id, userId, dataUserLike);
};

const uploadUserLike = async (id, userId, dataUserLike) => {
  const { title, link, description, timestamp, avatar, username } =
    dataUserLike;
  await setDoc(doc(db, 'users', userId, 'likes', id), {
    id,
    title,
    link,
    description,
    timestampLink: timestamp,
    avatar,
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

const uploadComment = async (id, user, comment, title) => {
  const { id: userId, username, avatar } = user;
  const commentTrim = comment.trim();
  await addDoc(collection(db, 'links', id, 'comments'), {
    userId,
    username,
    avatar,
    comment: commentTrim,
    timestamp: serverTimestamp(),
  });

  uploadUserComment(id, userId, comment, title);
};

const uploadUserComment = async (id, userId, comment, title) => {
  await addDoc(collection(db, 'users', userId, 'comments'), {
    id,
    comment,
    title,
    timestamp: serverTimestamp(),
  });
};

const getComments = (id, callback) => {
  return onSnapshot(
    query(
      collection(db, 'links', id, 'comments'),
      orderBy('timestamp', 'desc')
    ),
    (snapshot) => {
      callback(snapshot?.docs);
    }
  );
};

const getUserComments = (id, callbackDocs, callbackEmpty) => {
  const commentQuery = query(
    collection(db, 'users', id, 'comments'),
    orderBy('timestamp', 'desc'),
    limit(3)
  );

  getDocs(commentQuery).then((documentSnapshotsNew) => {
    callbackDocs(documentSnapshotsNew.docs);
    callbackEmpty(documentSnapshotsNew.empty);
  });
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
  uploadComment,
  getComments,
  getUserComments,
};
