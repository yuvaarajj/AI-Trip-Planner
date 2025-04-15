// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBCFbAPM5cp1AtO9CJtNODgd4lnuyK0FCI",
  authDomain: "ai-trip-planner-bc7e7.firebaseapp.com",
  projectId: "ai-trip-planner-bc7e7",
  storageBucket: "ai-trip-planner-bc7e7.firebasestorage.app",
  messagingSenderId: "674191408854",
  appId: "1:674191408854:web:96773a97b1c16a58265377",
  measurementId: "G-G7YB3DD4KF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
