import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAADEqknjfpJT2OGLQWBsh1se7zi_JoLQg',
  authDomain: 'projects-count.firebaseapp.com',
  projectId: 'projects-count',
  storageBucket: 'projects-count.appspot.com',
  messagingSenderId: '872050377911',
  appId: '1:872050377911:web:2fb7fa05b866befd8f7932',
  measurementId: 'G-BZFEKPRPTN',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const authentication = getAuth(app);

export { app, db, storage, authentication };
