import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseMain/firebase';
import { orderByValues } from 'utils/defaultValues';

export const getUserLinks = (
  userId,
  callback,
  callbackLoading,
  callbackEmpty,
  valueOrder
) => {
  if (valueOrder) {
    callbackLoading(true);
    const orderByValue =
      valueOrder === orderByValues.RECIENTES
        ? 'timestamp'
        : valueOrder === orderByValues.POPULARES && 'allLikes';

    return onSnapshot(
      query(
        collection(db, 'links'),
        where('id', '==', userId),
        orderBy(orderByValue, 'desc')
      ),
      ({ docs, empty }) => {
        callback(docs);
        callbackLoading(false);
        callbackEmpty(empty);
      }
    );
  }
};
