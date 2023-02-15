import React from 'react'
import app from '../Firebase';
import { Form, Button, Navbar, Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, browserSessionPersistence } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 
import logo from '../Components/uFaithLogo.svg'
import { useNavigate } from 'react-router-dom';


class CustomNavbarOld extends React.Component {


  // Firebase Start
  componentDidMount() {
  getFirestore(app);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user IS SIGNED IN')
    } else {
      console.log('user is NOT signed in');
    }
  });
  setPersistence(auth, browserLocalPersistence);
}

render() { 

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
          {this.props.userExists==='true' ? 
            <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/Courses">Courses</Nav.Link>
            <Nav.Link href="/Bookshelf">Bookshelf</Nav.Link>
            <Nav.Link href={"/profile/"+getAuth(app).currentUser.uid}>Profile</Nav.Link>
            <Nav.Link href="/" onClick={() => signOut(getAuth(app))} path='/'>Logout</Nav.Link>
        </Nav>    
        :
        <Nav className="justify-content-end flex-grow-1 pe-3">
        <Nav.Link onClick={() => this.props.showLogin()}>Login</Nav.Link>
        <Nav.Link onClick={() => this.props.showSignUp()}>Sign-up</Nav.Link>
        <Nav.Link href="/Courses">Courses</Nav.Link>
        <Nav.Link href="/Bookshelf">Bookshelf</Nav.Link>
      </Nav> }
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    
    )
}
}
 
export default CustomNavbarOld;