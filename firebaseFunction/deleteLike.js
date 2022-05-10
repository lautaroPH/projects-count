import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteOneLikeNumberForLink } from './deleteOneLikeNumberForLink';
import { deleteUserLike } from './deleteUserLike';

export const deleteLike = async (id, userId, likes) => {
  await deleteDoc(doc(db, 'links', id, 'likes', userId));

  await deleteOneLikeNumberForLink(id, likes);
  await deleteUserLike(id, userId);
};
