import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from 'firebaseMain/firebase';

export const uploadImage = async (selectedFile, id, userId) => {
  const imageRef = ref(storage, `links/${id}/image`);

  await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, `links`, id), { image: downloadURL });
    await updateDoc(doc(db, 'users', userId, 'links', id), {
      image: downloadURL,
    });
  });
};
