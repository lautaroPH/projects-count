import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getOneLink = async (id, isSearch = false) => {
  const querySnapshot = doc(db, 'links', id);

  const linkRef = await getDoc(querySnapshot);

  if (linkRef.data() && isSearch) {
    return {
      ...linkRef.data(),
      id: linkRef.id,
      userId: linkRef.data().id,
      timestamp: linkRef.data().timestamp?.seconds * 1000,
    };
  } else if (linkRef.data()) {
    return linkRef;
  } else {
    throw new Error('No existe el link');
  }
};
