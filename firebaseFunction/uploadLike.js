import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import Swal from 'sweetalert2';
import { uploadUserLike } from './uploadUserLike';

export const uploadLike = async (id, user, dataUserLike, links, setLinks) => {
  const { id: userId, username } = user;

  const querySnapshot = doc(db, 'links', id);

  const linkRef = await getDoc(querySnapshot);

  if (linkRef.data()) {
    await setDoc(doc(db, 'links', id, 'likes', userId), {
      id: userId,
      username,
      timestamp: serverTimestamp(),
    });

    uploadUserLike(id, userId, dataUserLike);
  } else {
    Swal.fire({
      text: 'Este link no existe más',
      icon: 'error',
      timer: '3000',
    });
    const newLinks = links.filter((link) => link.id !== id);

    setLinks(newLinks);
  }
};
