import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import Swal from 'sweetalert2';
import { editUserComment } from './editUserComment';

export const editComment = async (
  linkId,
  commentId,
  comment,
  userId,
  comments,
  setComments,
  setLinks,
  links
) => {
  const querySnapshot = doc(db, 'links', linkId);

  const linkRef = await getDoc(querySnapshot);

  if (linkRef.data()) {
    await updateDoc(doc(db, 'links', linkId, 'comments', commentId), {
      comment: comment.trim(),
      isEdited: true,
    });

    const querySnapshot = doc(db, 'links', linkId, 'comments', commentId);

    const commentEditedRef = await getDoc(querySnapshot);

    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return commentEditedRef;
      }

      return comment;
    });

    setComments(newComments);

    editUserComment(userId, commentId, comment.trim());
  } else {
    Swal.fire({
      text: 'Este link no existe más',
      icon: 'error',
      timer: '3000',
    });
    const newLinks = links.filter((link) => link.id !== linkId);

    setLinks(newLinks);
  }
};
