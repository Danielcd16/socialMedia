// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqjq7VbakNdhVrMU4x32H7Z4d5VmikSuo",
  authDomain: "social-media-react-3e645.firebaseapp.com",
  projectId: "social-media-react-3e645",
  storageBucket: "social-media-react-3e645.appspot.com",
  messagingSenderId: "299280654724",
  appId: "1:299280654724:web:2c36f3231ccc1f9926bdd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)



/* firebase rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow write, update: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, delete: if request.auth != null

    }
  }
}

con firebase npo es necesario hacer ningun tipo de fetch


*/
