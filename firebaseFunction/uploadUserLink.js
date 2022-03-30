import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const uploadUserLink = async (userId, id, values) => {
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
