import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { uploadImage } from './uploadImage';

export const editLink = async (id, values, selectedFile) => {
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
};
