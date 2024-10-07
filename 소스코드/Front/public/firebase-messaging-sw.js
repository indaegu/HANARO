// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4JAkwP09vc-rOL95Fd_lEO_Mtj2MQwxc",
  authDomain: "hanaro-c54d5.firebaseapp.com",
  projectId: "hanaro-c54d5",
  storageBucket: "hanaro-c54d5.appspot.com",
  messagingSenderId: "788717978659",
  appId: "1:788717978659:web:b024f44a57657afc8c5d96",
  measurementId: "G-4HJT6J4155",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
