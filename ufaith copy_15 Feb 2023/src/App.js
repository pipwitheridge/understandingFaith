import React from 'react';
import app from './Firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, browserSessionPersistence } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 
import {BrowserRouter as Router, Routes, Route, useParams, HashRouter, BrowserRouter} from "react-router-dom";
import Home from './Components/Home';
import Bookshelf from "./Components/Bookshelf/Bookshelf";
import { Container } from "react-bootstrap";
import Profile from "./Components/Profile/Profile";
import Courses from "./Components/Courses/Courses";
import CourseUnits from './Components/Courses/CourseUnits';
import UnitLessons from './Components/Courses/UnitLessons';
import Module from './Components/Courses/Module';
import Quiz from './Components/Courses/Quiz';

function App() {
  
// Initialize Firebase
  getFirestore(app);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUID = auth.currentUser.uid
      const userEmail = auth.currentUser.email
      localStorage.setItem("signedIn", "true")
      localStorage.setItem("userUID", userUID)
      localStorage.setItem("userEmail", userEmail)
    } else {
      localStorage.removeItem("signedIn")
      localStorage.removeItem("userUID")
      localStorage.removeItem("userEmail")
    }
  });
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.

const uid = auth.currentUser.uid
})
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  return (
    <Container className="col-xl-8 col-lg-8" style={{background: "white"}}>
    <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/bookshelf" element={<Bookshelf />}>
          </Route>
          <Route path="/courses/" element={<Courses />}>
          </Route>
          <Route path="/profile/:profileID" element={<Profile />}>
          </Route>
          <Route path="/courses/:courseID" element={<CourseUnits />}>
          </Route>
          <Route path="/courses/:courseID/:unitID" element={<UnitLessons />}>
          </Route>
          <Route path="/courses/:courseID/:unitID/:lessonID" element={<Module />}>
          </Route>
          <Route path="/courses/:courseID/:unitID/:lessonID/:moduleID" element={<Module />}>
          </Route>
          <Route path="/courses/:courseID/:unitID/quiz" element={<Quiz />}>
          </Route>
        </Routes>  
    </BrowserRouter>
    </Container>
  );
}

export default App;
