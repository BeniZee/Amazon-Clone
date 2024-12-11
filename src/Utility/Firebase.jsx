import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV_q0NKeXtjg0p53cKrnY8Mb2cOex80QE",
  authDomain: "clone-aca4e.firebaseapp.com",
  projectId: "clone-aca4e",
  storageBucket: "clone-aca4e.firebasestorage.app",
  messagingSenderId: "685975069602",
  appId: "1:685975069602:web:3800b1b0db1a7bfa7608fb",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
