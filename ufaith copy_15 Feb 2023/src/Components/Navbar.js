import React from 'react'
import app from '../Firebase';
import { Form, Button, Navbar, Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, browserSessionPersistence } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 
import logo from '../Components/uFaithLogo.svg'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import RetrieveData from './SearchPeople';


function CustomNavbar(props) {

   // INITIALIZE FIREBASE STUFF
   const db = getFirestore(app);
   const currentUser = getAuth(app).currentUser;
   const userUID = localStorage.getItem("userUID")
   const signedIn = localStorage.getItem("signedIn")
   const showLogin = () => props.showLogin();
   const showSignUp = () => props.showSignUp();

  // DISPLAYS DIFFERENT BUTTONS DEPENDING ON WHETHER USER IS SIGNED IN
  function UserDependentLinks() {
    return(
      <>
      {signedIn ? 
      <Nav className="justify-content-end flex-grow-1 pe-3">
      <div className="d-flex align-items-center">
      <Nav.Link href="/Courses/">Courses</Nav.Link>
      <Nav.Link href="/Bookshelf">Bookshelf</Nav.Link>
      <Nav.Link href={signedIn ? "/profile/"+userUID : null}>Profile</Nav.Link>
      <Nav.Link href="/" onClick={() => signOut(getAuth(app))} path='/'>Logout</Nav.Link>
      </div>
      </Nav>    
      :
      <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link onClick={() => showLogin()}>Login</Nav.Link>
      <Nav.Link onClick={() => showSignUp()}>Sign-up</Nav.Link>
      <Nav.Link href="/Courses/">Courses</Nav.Link>
      <Nav.Link href="/Bookshelf">Bookshelf</Nav.Link>
      </Nav> }
      </>
        )
      }

  // FINAL RETURN
  return(
      <Navbar key="md" bg="light" expand="md" className="mb-3 bg-white shadow-sm">
      <Container className="mx-3" fluid>
        <Navbar.Brand href="/"><img src={logo} className="fluid"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas id="offcanvasNavbar-expand-md" aria-labelledby="offcanvasNavbarLabel-expand-md" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>   
          <UserDependentLinks />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    )
}

 
export default CustomNavbar;