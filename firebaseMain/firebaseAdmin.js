import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseKey } from 'firebase-key';

const admin = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(firebaseKey),
    });

const db = getFirestore(admin);

export { db };
