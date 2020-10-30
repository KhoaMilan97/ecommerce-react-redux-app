import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf4anaAFDTuKdzKMLBH1bmH7ZOCHiyB4o",
  authDomain: "ecommerce-6d87b.firebaseapp.com",
  databaseURL: "https://ecommerce-6d87b.firebaseio.com",
  projectId: "ecommerce-6d87b",
  storageBucket: "ecommerce-6d87b.appspot.com",
  messagingSenderId: "862899378871",
  appId: "1:862899378871:web:108b45a7011bc23cba0b32",
  measurementId: "G-51302FLZ2J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
