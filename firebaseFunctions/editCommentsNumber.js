import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { getCommentsNumber } from './getCommentsNumber';

export const editCommentsNumber = async (id) => {
  getCommentsNumber(id).then(async (commentRef) => {
    await updateDoc(doc(db, 'links', id, 'allCommentsNumber', id), {
      commentsNumber: commentRef - 1,
    });
  });
};
