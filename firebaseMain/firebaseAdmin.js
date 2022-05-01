var admin = require('firebase-admin');

var { firebaseKey } = require('firebase-key.js');

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
  });
} catch (e) {}

const db = admin.firestore();
export { db };
