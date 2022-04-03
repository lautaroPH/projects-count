import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import Swal from 'sweetalert2';
import { deleteLike } from './deleteLike';
import { uploadUserComment } from './uploadUserComment';

export const uploadComment = async (id, user, comment, title, router) => {
  const { id: userId, username, avatar } = user;
  const commentTrim = comment.trim();

  const querySnapshot = doc(db, 'links', id);

  const linkRef = await getDoc(querySnapshot);

  if (linkRef.data()) {
    const commentRef = await addDoc(collection(db, 'links', id, 'comments'), {
      userId,
      username,
      avatar,
      comment: commentTrim,
      timestamp: serverTimestamp(),
    });
    await uploadUserComment(id, userId, comment, title, commentRef.id);
  } else {
    Swal.fire({
      text: 'Este link no existe más',
      icon: 'error',
      timer: '3000',
    });
    router.reload();

    deleteLike(id, userId);
  }
};
