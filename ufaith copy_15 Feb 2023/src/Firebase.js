import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzkf85W_phE9ga_LG2GjXF-v6tG18gLtc",
    authDomain: "usersignuptesting-805b1.firebaseapp.com",
    databaseURL: "https://usersignuptesting-805b1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "usersignuptesting-805b1",
    storageBucket: "usersignuptesting-805b1.appspot.com",
    messagingSenderId: "339686936673",
    appId: "1:339686936673:web:b6c5e0877950b60f401a20"
  };

const app = initializeApp(firebaseConfig);

export default app; 