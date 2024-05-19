// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlunRq54MzhLTNicJByLJmrEnKyMk7bz8",
  authDomain: "gym24-7.firebaseapp.com",
  projectId: "gym24-7",
  storageBucket: "gym24-7.appspot.com",
  messagingSenderId: "685057894539",
  appId: "1:685057894539:web:fe902a6298c34adbdd8c8e",
  measurementId: "G-9ZXDS83S1H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);