import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig = {
//   apiKey: "AIzaSyBG4BziCqzH3gBSG8tG_6tZNNx86YzzBL8",
//   authDomain: "consulio-5bb7c.firebaseapp.com",
//   projectId: "consulio-5bb7c",
//   storageBucket: "consulio-5bb7c.appspot.com",
//   messagingSenderId: "1010769435934",
//   appId: "1:1010769435934:web:9a1436876ef62910597d0f",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBJeSRni9dZSNwevKUMOHv2aASy2kn17dY",
  authDomain: "consulio.firebaseapp.com",
  projectId: "consulio",
  storageBucket: "consulio.appspot.com",
  messagingSenderId: "869835421877",
  appId: "1:869835421877:web:5b9d11ad771f7704ec66fc"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);

export const auth = getAuth(firebase);
