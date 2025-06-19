// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL_7jxIG7rdxnpTwWD_RfBJNODyyPjLec",
  authDomain: "tifodb1.firebaseapp.com",
  databaseURL: "https://tifodb1-default-rtdb.firebaseio.com",
  projectId: "tifodb1",
  storageBucket: "tifodb1.firebasestorage.app",
  messagingSenderId: "595350486977",
  appId: "1:595350486977:web:6fc4af586094762280b940",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
