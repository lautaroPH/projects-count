var admin = require('firebase-admin');
var ncrypt = require('ncrypt-js');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const data = process.env.GOOGLE_APPLICATION_CREDENTIALS;
var _secretKey = process.env.SECRET_KEY;

var ncryptObject = new ncrypt(_secretKey);
var decryptedData = ncryptObject.decrypt(data);

try {
  initializeApp({
    credential: admin.credential.cert(decryptedData),
  });
} catch (e) {}

const db = getFirestore();
export { db };
