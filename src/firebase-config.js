import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByhlQA9r8HUhkEsSCP-LicJx3XVTp-Gt4",
  authDomain: "jkblog-app.firebaseapp.com",
  projectId: "jkblog-app",
  storageBucket: "jkblog-app.appspot.com",
  messagingSenderId: "298178331928",
  appId: "1:298178331928:web:0a243c1ba4cfce6ccd4a6d",
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
