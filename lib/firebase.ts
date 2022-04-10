import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMM_cdaL1dAPvl88NE4q1c4eZICR9H_ig",
  authDomain: "super-notes-17851.firebaseapp.com",
  projectId: "super-notes-17851",
  storageBucket: "super-notes-17851.appspot.com",
  messagingSenderId: "822933345761",
  appId: "1:822933345761:web:24ffac4a49be1452902ea0",
  measurementId: "G-YPY2YD2B06"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();

export const googleProvider = new GoogleAuthProvider()

export const timestamp = () => serverTimestamp()
export const fromMillis = (millis: number) => Timestamp.fromMillis(millis)