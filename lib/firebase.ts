// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAD7iZ1O7G6BQ6zMLE4Ca7w18SbrZ4aL9g",
  authDomain: "affordable-apps-b444e.firebaseapp.com",
  projectId: "affordable-apps-b444e",
  storageBucket: "affordable-apps-b444e.firebasestorage.app",
  messagingSenderId: "911435935218",
  appId: "1:911435935218:web:8dc0131ffaabceb1968f6b",
  measurementId: "G-NYCNGKH1V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
