import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import Swal from 'sweetalert2';

export const uploadAnswer = async (
  id,
  user,
  answer,
  commentId,
  comments,
  setComments
) => {
  const { id: userId, username, avatar } = user;
  const answerTrim = answer.trim();

  const querySnapshot = doc(db, 'links', id, 'comments', commentId);

  const commentRef = await getDoc(querySnapshot);

  if (commentRef.data()) {
    await addDoc(
      collection(db, 'links', id, 'comments', commentId, 'answers'),
      {
        userId,
        username,
        avatar,
        answer: answerTrim,
        commentId,
        timestamp: serverTimestamp(),
      }
    );
  } else {
    Swal.fire({
      text: 'Este comentario no existe más',
      icon: 'error',
      timer: '3000',
    });
    const newComments = comments.filter((comment) => comment.id !== commentId);

    setComments(newComments);
  }
};
