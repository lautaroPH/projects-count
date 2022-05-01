const { initializeApp, applicationDefault } = require('firebase-admin/app');

const { getFirestore } = require('firebase-admin/firestore');

try {
  initializeApp({
    credential: applicationDefault(),
  });
} catch (e) {}

const db = getFirestore();
export { db };
