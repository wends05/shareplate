import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyChcm8BD4Dr3bNpDa7PGTLOpTDhsR-gVjA",
  authDomain: "elef-resto.firebaseapp.com",
  projectId: "elef-resto",
  storageBucket: "elef-resto.appspot.com",
  messagingSenderId: "1084525990272",
  appId: "1:1084525990272:web:7b9848f3155f42db897165",
  measurementId: "G-HF7B8YRFRK"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const google = new GoogleAuthProvider();
google.addScope('email');
google.addScope('profile');

export const facebook = new FacebookAuthProvider();
facebook.addScope('email');
facebook.addScope('profile')