import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebaseMain/firebase";

export const getUsers = (callback) => {
  return onSnapshot(
    query(collection(db, "users"), orderBy("linksNumber", "desc"), limit(5)),
    ({ docs }) => {
      callback(docs);
    }
  );
};
