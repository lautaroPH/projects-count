import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';

export const getLinks = (callbackNoLink, callbackLinks) => {
  const querySnapshot = query(
    collection(db, 'links'),
    orderBy('timestamp', 'desc'),
    limit(30)
  );

  getDocs(querySnapshot).then((snapshot) => {
    callbackNoLink(snapshot.empty);
    callbackLinks(snapshot.docs);
  });
};
