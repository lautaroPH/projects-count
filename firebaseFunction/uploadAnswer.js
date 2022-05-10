import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useDeleteArray } from 'hooks/useDeleteArray';
import { swalNoCommentDark } from 'swals/dark/swalNoCommentDark';
import { swalNoCommentLight } from 'swals/light/swalNoCommentLight';
import Swal from 'sweetalert2';
import { getOneComment } from './getOneComment';

export const uploadAnswer = async (
  id,
  user,
  answer,
  commentId,
  comments,
  setComments,
  currentTheme,
  setCommentsNumber
) => {
  const { id: userId, username, avatar } = user;

  getOneComment(id, commentId)
    .then(async () => {
      await addDoc(
        collection(db, 'links', id, 'comments', commentId, 'answers'),
        {
          userId,
          username,
          avatar,
          answer,
          commentId,
          timestamp: serverTimestamp(),
        }
      );
    })
    .catch(() => {
      currentTheme === 'light'
        ? Swal.fire(swalNoCommentLight)
        : Swal.fire(swalNoCommentDark);

      const newArray = useDeleteArray(comments, commentId);

      setComments(newArray);
      setCommentsNumber((prev) => prev - 1);
    });
};
