import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getOneLink = async (id) => {
  const querySnapshot = doc(db, 'links', id);

  const linkRef = await getDoc(querySnapshot);

  if (linkRef.data()) {
    return linkRef;
  } else {
    throw new Error('No existe el link');
  }
};
