// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: import.meta.env.VITE_firebase_api_key,
    authDomain: import.meta.env.VITE_firebase_auth_domain,
    projectId: import.meta.env.VITE_firebase_project_id,
    storageBucket: import.meta.env.VITE_firebase_storage_bucket,
    messagingSenderId: import.meta.env.VITE_firebase_messaging_sender_id,
    appId: import.meta.env.VITE_firebase_app_id,
    measurementId: import.meta.env.VITE_firebase_measurement_id
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);