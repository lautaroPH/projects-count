import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { useDeleteArray } from 'hooks/useDeleteArray';
import { useEditArray } from 'hooks/useEditArray';
import { swalNoCommentDark } from 'swals/dark/swalNoCommentDark';
import { swalNoLInkDark } from 'swals/dark/swalNoLInkDark';
import { swalNoCommentLight } from 'swals/light/swalNoCommentLight';
import { swalNoLInkLight } from 'swals/light/swalNoLInkLight';
import Swal from 'sweetalert2';
import { editUserComment } from './editUserComment';
import { getOneComment } from './getOneComment';
import { getOneLink } from './getOneLink';

export const editComment = async (
  linkId,
  commentId,
  comment,
  userId,
  comments,
  setComments,
  setLinks,
  links,
  currentTheme,
  setCommentsNumber
) => {
  await getOneLink(linkId)
    .then(async () => {
      await updateDoc(doc(db, 'links', linkId, 'comments', commentId), {
        comment: comment.trim(),
        isEdited: true,
      })
        .then(async () => {
          await getOneComment(linkId, commentId).then((commentEdited) => {
            const newArray = useEditArray(commentEdited, comments, commentId);

            setComments(newArray);

            editUserComment(userId, commentId, comment.trim());
          });
        })
        .catch(() => {
          currentTheme === 'light'
            ? Swal.fire(swalNoCommentLight)
            : Swal.fire(swalNoCommentDark);

          const newArray = useDeleteArray(comments, commentId);

          setComments(newArray);
          setCommentsNumber((prev) => prev - 1);
        });
    })
    .catch(() => {
      currentTheme === 'light'
        ? Swal.fire(swalNoLInkLight)
        : Swal.fire(swalNoLInkDark);

      const newArray = useDeleteArray(links, linkId);

      setLinks(newArray);
    });
};
