import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import Swal from 'sweetalert2';
import { getLastCommentUpload } from './getLastCommentUpload';
import { uploadCommentsNumber } from './uploadCommentsNumber';
import { uploadUserComment } from './uploadUserComment';

export const uploadComment = async (
  id,
  user,
  comment,
  title,
  setComments,
  setLinks,
  links
) => {
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
    uploadUserComment(id, userId, comment, title, commentRef.id);
    uploadCommentsNumber(id);
    getLastCommentUpload(id, commentRef.id, setComments);
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
