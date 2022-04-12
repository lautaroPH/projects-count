import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getCommentsNumber } from './getCommentsNumber';

export const uploadCommentsNumber = async (id) => {
  getCommentsNumber(id).then(async (commentRef) => {
    await setDoc(doc(db, 'links', id, 'allCommentsNumber', id), {
      commentsNumber: commentRef + 1,
    });
  });
};
