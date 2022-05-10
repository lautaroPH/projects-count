import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteAnswerCollection } from './deleteAnswerCollection';
import { deleteUserComment } from './deleteUserComment';
import { editCommentsNumber } from './editCommentsNumber';

export const deleteComment = async (
  linkId,
  commentId,
  userId,
  setComments,
  comments
) => {
  await deleteDoc(doc(db, 'links', linkId, 'comments', commentId));

  const newComments = comments.filter((comment) => comment.id !== commentId);

  setComments(newComments);

  await editCommentsNumber(linkId);
  await deleteUserComment(commentId, userId);
  await deleteAnswerCollection(linkId, commentId);
};
