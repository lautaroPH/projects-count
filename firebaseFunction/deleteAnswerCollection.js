import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const deleteAnswerCollection = async (linkId, commentId) => {
  const answerRef = collection(
    db,
    `links/${linkId}/comments/${commentId}/answers`
  );
  const documentSnapshot = await getDocs(answerRef);

  documentSnapshot.docs.map(async (answer) => {
    await deleteDoc(
      doc(db, `links/${linkId}/comments/${commentId}/answers/${answer.id}`)
    );
  });
};
