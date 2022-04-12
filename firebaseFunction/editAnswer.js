import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const editAnswer = async (linkId, commentId, answerId, answer) => {
  await updateDoc(
    doc(db, 'links', linkId, 'comments', commentId, 'answers', answerId),
    {
      answer: answer.trim(),
      isEdited: true,
    }
  );
};
