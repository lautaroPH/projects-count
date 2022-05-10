import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getMostPopularLink = async (
  userId,
  callbackDoc,
  callbackEmpty,
  callbackLoading
) => {
  callbackLoading(true);
  const linkQuery = query(
    collection(db, 'links'),
    where('id', '==', userId),
    orderBy('allLikes', 'desc'),
    limit(1)
  );

  getDocs(linkQuery).then(({ docs, empty }) => {
    callbackDoc(docs[0].data());
    callbackEmpty(empty);
    callbackLoading(false);
  });
};
