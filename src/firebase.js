// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyABEEFNfhHBYQ9cxiunZi-1IQCq_ah0hws",
  authDomain: "honcook-2f959.firebaseapp.com",
  projectId: "honcook-2f959",
  storageBucket: "honcook-2f959.appspot.com",
  messagingSenderId: "575135069780",
  appId: "1:575135069780:web:a8a6f2f776856106bf5fc1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
