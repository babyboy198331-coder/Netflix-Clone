import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyC18ofY9UrzljvMw4bAEO86QV5d_5x2gcw",
  authDomain: "netflix-clone-2e4de.firebaseapp.com",
  projectId: "netflix-clone-2e4de",
  storageBucket: "netflix-clone-2e4de.firebasestorage.app",
  messagingSenderId: "70169710180",
  appId: "1:70169710180:web:dcc717f679dec0521c5971",
  measurementId: "G-HMJKJ49MNV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    console.log("SIGNUP CALLED");

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    });

    return user;
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    toast.error(error.code);
  }
};

const login = async (email, password) => {
  try {
    console.log("LOGIN CALLED");

    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    toast.error(error.code);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("LOGOUT SUCCESS");
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
  }
};

export { auth, app, db, signUp, login, logout };