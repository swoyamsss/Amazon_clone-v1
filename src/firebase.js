import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBcgXDHPlkiULm5JXksCVkiXJJshtBuLlU",
  authDomain: "clone-aacf6.firebaseapp.com",
  projectId: "clone-aacf6",
  storageBucket: "clone-aacf6.appspot.com",
  messagingSenderId: "416898219943",
  appId: "1:416898219943:web:bec7da2cab95dde0534082",
  measurementId: "G-DEVXBKNKJT",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
