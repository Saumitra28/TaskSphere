// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "tasksphere-3d8aa.firebaseapp.com",
  projectId: "tasksphere-3d8aa",
  storageBucket: "tasksphere-3d8aa.appspot.com",
  messagingSenderId: "210773467554",
  appId: "1:210773467554:web:ff0796db4a33256124d2fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
