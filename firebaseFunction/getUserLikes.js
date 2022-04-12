import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getUserLikes = async (id, callbackDocs, callbackEmpty) => {
  const commentQuery = query(
    collection(db, 'users', id, 'likes'),
    orderBy('timestamp', 'desc'),
    limit(3)
  );

  await getDocs(commentQuery).then((documentSnapshotsNew) => {
    callbackDocs(documentSnapshotsNew.docs);
    callbackEmpty(documentSnapshotsNew.empty);
  });
};
