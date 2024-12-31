import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase Config Object
const firebaseConfig = {
  apiKey: 'AIzaSyDCqoevjhtj3wHQSzsPQzcXyfSCZLz3VkI',
  authDomain: 'todo-project-301.firebaseapp.com',
  projectId: 'todo-project-301',
  storageBucket: 'todo-project-301.firebasestorage.app',
  messagingSenderId: '400290365752',
  appId: '1:400290365752:web:de9ecfaf365b4973c3c1cd',
  measurementId: 'G-5F56KL3GM8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
