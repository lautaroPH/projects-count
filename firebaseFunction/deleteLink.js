import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { deleteCommentCollection } from './deleteCommentCollection';
import { deleteImageStorage } from './deleteImageStorage';
import { deleteLikesCollection } from './deleteLikesCollection';
import { deleteUserCommentCollection } from './deleteUserCommentCollection';
import { deleteUserLikesCollection } from './deleteUserLikesCollection';
import { deleteUserLink } from './deleteUserLink';

export const deleteLink = async (id, image, userId) => {
  await deleteDoc(doc(db, 'links', id));
  if (image) {
    deleteImageStorage(id);
  }
  deleteUserLink(id, userId);
  deleteLikesCollection(id);
  deleteCommentCollection(id);
  deleteUserCommentCollection(userId, id);
  deleteUserLikesCollection(userId, id);
};
