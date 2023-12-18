// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { User } from './components/Users';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfvslmSnAIBQOuE0pP6hGboJRs7vy2BFw",
  authDomain: "planningpoker-835ab.firebaseapp.com",
  projectId: "planningpoker-835ab",
  storageBucket: "planningpoker-835ab.appspot.com",
  messagingSenderId: "211445052728",
  appId: "1:211445052728:web:d2d7a013039d08bc203dcd",
  measurementId: "G-HEQMLF17C5"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const db = firebase.firestore();

export default getFirestore();
