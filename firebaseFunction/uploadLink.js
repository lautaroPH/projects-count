import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getOneLink } from './getOneLink';
import { uploadImage } from './uploadImage';
import { uploadOneMoreLinkForUser } from './uploadOneMoreLinkForUser';

export const uploadLink = async (values, selectedFile, user) => {
  const { title, link, githubRepo, tecnologies, description } = values;

  const docRef = await addDoc(collection(db, 'links'), {
    title: title.trim(),
    link: link.trim(),
    githubRepo: githubRepo.trim(),
    tecnologies: tecnologies.trim(),
    description: description,
    allLikes: 0,
    username: user?.username,
    email: user?.email,
    id: user?.id,
    userImage: user?.avatar,
    timestamp: serverTimestamp(),
    isEdited: false,
  });

  const id = docRef.id;

  if (selectedFile) {
    await uploadImage(selectedFile, id);
  }

  const linkRef = await getOneLink(id);

  uploadOneMoreLinkForUser(user?.id);

  return linkRef;
};
