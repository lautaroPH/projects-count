var admin = require('firebase-admin');

var serviceAccount = require('firebase-key.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (e) {}

const db = admin.firestore();
export { db };
