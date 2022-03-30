import { deleteObject, ref } from 'firebase/storage';
import { storage } from 'firebaseMain/firebase';

export const deleteImageStorage = async (id) => {
  const desertRef = ref(storage, `links/${id}/image`);
  deleteObject(desertRef);
};
