// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEIdnHmW64BOaTT3Ke0ybAczahQLbjPMo",
  authDomain: "react-second-market-1db76.firebaseapp.com",
  projectId: "react-second-market-1db76",
  storageBucket: "react-second-market-1db76.appspot.com",
  messagingSenderId: "283256221301",
  appId: "1:283256221301:web:d0fbcfa37b2e9016acd23c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const auth = getAuth(app)