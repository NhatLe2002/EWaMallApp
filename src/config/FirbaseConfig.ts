// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDgNGEdoiSKDZcC_sV1RMly2FofteiJ3Yc',
  authDomain: 'ewamall-cfe1d.firebaseapp.com',
  projectId: 'ewamall-cfe1d',
  storageBucket: 'ewamall-cfe1d.appspot.com',
  messagingSenderId: '722517407946',
  appId: '1:722517407946:web:60e8b73e420bb613669c33',
  measurementId: 'G-73Z6SFPXM9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
