// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGRouwpP21AJdfdg9KhJzIlJFciKpPgVU",
  authDomain: "baby-history2.firebaseapp.com",
  projectId: "baby-history2",
  storageBucket: "baby-history2.appspot.com",
  messagingSenderId: "633669089889",
  appId: "1:633669089889:web:a9a171dbc51ded1c190820",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

const isEmulating = window.location.hostname === "localhost"
if (isEmulating) {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(db, "127.0.0.1", 8080)
}
