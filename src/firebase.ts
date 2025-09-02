// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBXcQSavIeBblQ9HSQZgaQf6Nnq7V8SY8",
  authDomain: "my-portfolio-tanvir.firebaseapp.com",
  projectId: "my-portfolio-tanvir",
  storageBucket: "my-portfolio-tanvir.firebasestorage.app",
  messagingSenderId: "646292636645",
  appId: "1:646292636645:web:3c44fd9b9f149a85a3250c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
