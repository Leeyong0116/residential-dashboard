import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJFPrE4d-Wq6Ckp_5Qmar6Fv8Uv1FGed8",
    authDomain: "residential-system-b840e.firebaseapp.com",
    projectId: "residential-system-b840e",
    storageBucket: "residential-system-b840e.firebasestorage.app",
    messagingSenderId: "686473005760",
    appId: "1:686473005760:web:2e09c59fe0111e21d9fb25",
    measurementId: "G-JMWD26WNCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
