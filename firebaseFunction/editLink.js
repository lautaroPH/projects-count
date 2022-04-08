import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { uploadImage } from './uploadImage';

export const editLink = async (id, values, selectedFile, setLinks, links) => {
  await updateDoc(doc(db, 'links', id), {
    title: values.title.trim(),
    link: values.link.trim(),
    githubRepo: values.githubRepo.trim(),
    tecnologies: values.tecnologies.trim(),
    description: values.description.trim(),
    isEdited: true,
  });

  if (selectedFile) {
    await uploadImage(selectedFile, id);
  }

  const querySnapshot = doc(db, 'links', id);

  const linkEditedRef = await getDoc(querySnapshot);

  const newLinks = links.map((link) => {
    if (link.id === id) {
      return linkEditedRef;
    }

    return link;
  });

  setLinks(newLinks);
};
