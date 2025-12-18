// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY || "AIzaSyB6xk8ipWXgXfKqQEVKts6jE-GyW0jxavQ",
//   authDomain: "taskmanagementapplicatio-1aacd.firebaseapp.com",
//   projectId: "taskmanagementapplicatio-1aacd",
//   storageBucket: "taskmanagementapplicatio-1aacd.firebasestorage.app",
//   messagingSenderId: "512401169464",
//   appId: "1:512401169464:web:0ad997f2c304fe11249acd",
//   measurementId: "G-0S7JEKS5K3"
// };

// const app = initializeApp(firebaseConfig);

// export { app };

// ---------------------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6xk8ipWXgXfKqQEVKts6jE-GyW0jxavQ",
  authDomain: "taskmanagementapplicatio-1aacd.firebaseapp.com",
  projectId: "taskmanagementapplicatio-1aacd",
  storageBucket: "taskmanagementapplicatio-1aacd.firebasestorage.app",
  messagingSenderId: "512401169464",
  appId: "1:512401169464:web:0ad997f2c304fe11249acd",
  measurementId: "G-0S7JEKS5K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {app};
