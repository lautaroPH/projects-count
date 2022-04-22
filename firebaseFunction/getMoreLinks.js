import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { orderByValues } from 'utils/defaultValues';

export const getMoreLinks = (
  callbackNoLink,
  callbackLinks,
  valueOrder,
  setIsLoadingMoreLinks,
  lastVisible
) => {
  if (valueOrder) {
    const orderByValue =
      valueOrder === orderByValues.RECIENTES
        ? 'timestamp'
        : valueOrder === orderByValues.POPULARES && 'allLikes';

    setIsLoadingMoreLinks(true);
    const querySnapshot = query(
      collection(db, 'links'),
      orderBy(orderByValue, 'desc'),
      startAfter(lastVisible),
      limit(20)
    );

    getDocs(querySnapshot).then(({ empty, docs }) => {
      callbackNoLink(empty);
      callbackLinks((links) => [...links, ...docs].flat(1));
      setIsLoadingMoreLinks(false);
    });
  }
};
