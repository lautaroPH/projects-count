import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const editAnswer = async (
  linkId,
  commentId,
  answerId,
  answer,
  userId
) => {
  await updateDoc(
    doc(db, 'links', linkId, 'comments', commentId, 'answers', answerId),
    {
      userId,
      commentId,
      answer: answer,
      isEdited: true,
    }
  );
};
