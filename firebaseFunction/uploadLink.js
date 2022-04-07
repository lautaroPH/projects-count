import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { uploadImage } from './uploadImage';

export const uploadLink = async (values, selectedFile, user) => {
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

  if (selectedFile) {
    await uploadImage(selectedFile, id);
  }
};
