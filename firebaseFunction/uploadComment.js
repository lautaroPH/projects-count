import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useDeleteArray } from 'hooks/useDeleteArray';
import { swalNoLInkDark } from 'swals/dark/swalNoLInkDark';
import { swalNoLInkLight } from 'swals/light/swalNoLInkLight';
import Swal from 'sweetalert2';
import { getLastCommentUpload } from './getLastCommentUpload';
import { getOneLink } from './getOneLink';
import { uploadCommentsNumber } from './uploadCommentsNumber';
import { uploadUserComment } from './uploadUserComment';

export const uploadComment = async (
  id,
  user,
  comment,
  title,
  setComments,
  setLinks,
  links,
  currentTheme,
  isOneLink,
  router
) => {
  const { id: userId, username, avatar } = user;
  await getOneLink(id)
    .then(async () => {
      const commentRef = await addDoc(collection(db, 'links', id, 'comments'), {
        userId,
        username,
        avatar,
        comment: comment.trim(),
        timestamp: serverTimestamp(),
      });
      await getLastCommentUpload(id, commentRef.id, setComments);
      await uploadUserComment(id, userId, comment, title, commentRef.id);
      await uploadCommentsNumber(id);
    })
    .catch(() => {
      currentTheme === 'light'
        ? Swal.fire(swalNoLInkLight)
        : Swal.fire(swalNoLInkDark);
      if (isOneLink) {
        router.push('/');
      } else {
        const newArray = useDeleteArray(links, id);

        setLinks(newArray);
      }
    });
};
