import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnzfTJnsrQcfts8Hg2-c6QEh0rH_8qdQA",
  authDomain: "olx-clone-c165c.firebaseapp.com",
  projectId: "olx-clone-c165c",
  storageBucket: "olx-clone-c165c.appspot.com",
  messagingSenderId: "844568384102",
  appId: "1:844568384102:web:7a5516ee6f1c3e0de813a7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
