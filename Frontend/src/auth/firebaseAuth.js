// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvR8RqxgEG3r1I_Nds-jRJCQ9RViVPKGc",
  authDomain: "react-blog-website-f59e3.firebaseapp.com",
  projectId: "react-blog-website-f59e3",
  storageBucket: "react-blog-website-f59e3.appspot.com",
  messagingSenderId: "573429726184",
  appId: "1:573429726184:web:8da92d1982cd2e6f1f025d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
      
// google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const googleAuth = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => (user = result.user))
    .catch((err) => console.log(err));

  return user;
};
