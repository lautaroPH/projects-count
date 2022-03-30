import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getLinks = (callbackNoLink, callbackLinks) => {
  return onSnapshot(
    query(collection(db, 'links'), orderBy('timestamp', 'desc'), limit(30)),
    (snapshot) => {
      callbackNoLink(snapshot.empty);
      callbackLinks(snapshot.docs);
    }
  );
};
