// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCblMXPgB_vOv3jLjEbZYj1nUftQKYNarg",
  authDomain: "chef-bazzer.firebaseapp.com",
  projectId: "chef-bazzer",
  storageBucket: "chef-bazzer.firebasestorage.app",
  messagingSenderId: "1009547412376",
  appId: "1:1009547412376:web:4b39c60ed08a6d0168e1ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);