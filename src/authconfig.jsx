import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAMh9xFYrQpz9eKhIRYBrWy1lmFybf59bQ",
  authDomain: "memory-vault-9eff8.firebaseapp.com",
  projectId: "memory-vault-9eff8",
  storageBucket: "memory-vault-9eff8.appspot.com",
  messagingSenderId: "1067835131090",
  appId: "1:1067835131090:web:72fce498a60fecd9f5d90b",
  measurementId: "G-1YN8EWMV6B"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
