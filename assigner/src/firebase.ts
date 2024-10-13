// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: import.meta.env.VITE_firebase_api_key,
  authDomain: import.meta.env.VITE_firebase_auth_domain,
  projectId: import.meta.env.VITE_firebase_project_id,
  storageBucket: import.meta.env.VITE_firebase_storage_bucket,
  messagingSenderId: import.meta.env.VITE_firebase_messaging_sender_id,
  appId: import.meta.env.VITE_firebase_app_id,
  measurementId: import.meta.env.VITE_firebase_measurement_id, // optional
};

  // console.log(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// If you need analytics, uncomment the following line
// const analytics = getAnalytics(app);
