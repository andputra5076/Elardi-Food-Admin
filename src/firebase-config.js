// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr3iEKyQSvd9z_AOtwy9kXMsaJQ2_4VsE",
  authDomain: "my-elardi-app.firebaseapp.com",
  databaseURL: "https://my-elardi-app-default-rtdb.firebaseio.com",
  projectId: "my-elardi-app",
  storageBucket: "my-elardi-app.appspot.com",
  messagingSenderId: "515465437260",
  appId: "1:515465437260:web:e2d7b572fc0536536514e9",
  measurementId: "G-ZRKTL47QEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// export default storage;
export const db = getFirestore(app);
export const storage = getStorage(app);

