// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from'firebase/firestore'
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, initializeAuth} from 'firebase/auth'
// @ts-expect-error Some error with types in this import because of the versions
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { getAnalytics } from "firebase/analytics";
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
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const googleProvider = new GoogleAuthProvider();
export const facebookProvide = new FacebookAuthProvider()

// Keeps user data so on refresh we don't lose user data
export const db = getFirestore(app);
export const Users = collection(db, 'Users')