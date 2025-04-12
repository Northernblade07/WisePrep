// Import the functions you need from the SDKs you need

import { getApp,getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeSZIZQlvS4Bp1G6DtGzFSoFoV0YPauQQ",
  authDomain: "wiseprep-9a602.firebaseapp.com",
  projectId: "wiseprep-9a602",
  storageBucket: "wiseprep-9a602.firebasestorage.app",
  messagingSenderId: "617826915227",
  appId: "1:617826915227:web:3775de65c5f523352f073e",
  measurementId: "G-G22MM3KQP9"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)