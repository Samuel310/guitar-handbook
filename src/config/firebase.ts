// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgUSVBowJsfFUiBVfTX3XdEFHGVGcN8F8",
  authDomain: "guitar-handbook.firebaseapp.com",
  projectId: "guitar-handbook",
  storageBucket: "guitar-handbook.firebasestorage.app",
  messagingSenderId: "423789881920",
  appId: "1:423789881920:web:47219d86b04a71bd464da5",
  measurementId: "G-83RQK9M4JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
