
import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCRrG1ela-JGksytxi3sMPg5Ey76CNwjHg",
  authDomain: "crud-basico-ca0b7.firebaseapp.com",
  projectId: "crud-basico-ca0b7",
  storageBucket: "crud-basico-ca0b7.appspot.com",
  messagingSenderId: "4884092521",
  appId: "1:4884092521:web:7b95c2e246258eacd5f4f8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}