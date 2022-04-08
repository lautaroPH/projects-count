import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getCommentsNumber } from './getCommentsNumber';

export const uploadCommentsNumber = async (id) => {
  getCommentsNumber(id).then(async (commentRef) => {
    if (commentRef > 0) {
      await updateDoc(doc(db, 'links', id, 'allCommentsNumber', id), {
        commentsNumber: commentRef + 1,
      });
    } else {
      await setDoc(doc(db, 'links', id, 'allCommentsNumber', id), {
        commentsNumber: 1,
      });
    }
  });
};
