import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { orderByValues } from 'utils/defaultValues';

export const getLinks = (
  callbackNoLink,
  callbackLinks,
  valueOrder,
  isLoading
) => {
  if (valueOrder) {
    const orderByValue =
      valueOrder === orderByValues.RECIENTES
        ? 'timestamp'
        : valueOrder === orderByValues.POPULARES && 'allLikes';

    isLoading(true);

    const querySnapshot = query(
      collection(db, 'links'),
      orderBy(orderByValue, 'desc'),
      limit(20)
    );

    getDocs(querySnapshot).then(({ empty, docs }) => {
      callbackNoLink(empty);
      callbackLinks(docs);
      isLoading(false);
    });
  }
};
