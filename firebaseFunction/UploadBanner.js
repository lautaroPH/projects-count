import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from 'firebaseMain/firebase';

export const uploadBanner = async (file, userId) => {
  const imageRef = ref(storage, `users/${userId}/image`);

  await uploadString(imageRef, file, 'data_url').then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, `users`, userId), { banner: downloadURL });
  });
};
