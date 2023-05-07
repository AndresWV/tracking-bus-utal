// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';

import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA8QaRpbVBTM2YzkZIXZJyRXUj_MXzE-ao',
  authDomain: 'vh-tracker-43e25.firebaseapp.com',
  projectId: 'vh-tracker-43e25',
  storageBucket: 'vh-tracker-43e25.appspot.com',
  messagingSenderId: '505585435584',
  appId: '1:505585435584:web:a137979dc14c1e47127e25',
};

// Initialize Firebase
let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase app has not been initialized. Initializing...');
} else {
  app = getApp();
  console.log('Firebase app has been created. Getting...');
}

export const auth = getAuth(app);
