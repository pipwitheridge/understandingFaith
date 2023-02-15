import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Link } from 'react-router-dom';
import logo from './uFaithLogo.svg';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 


class Navbar1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTest: 0
  };
}

render() {
  
const userExists = getAuth().currentUser != null
 console.log(userExists)
 console.log(getAuth().currentUser)
    return (  
        <Navbar key="md" bg="light" expand="md" className="mb-3 bg-white shadow-sm">
          <Container className="mx-3" fluid>
            <Navbar.Brand><Link to="/home"><img src={logo} className="fluid"></img></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
            <Navbar.Offcanvas id="offcanvasNavbar-expand-md" aria-labelledby="offcanvasNavbarLabel-expand-md" 
                            placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              {userExists ? <SignedInLinks /> : <SignedOutLinks />}
                <Form className="d-flex">
                  <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                  <Button onClick={() => this.setState({userTest: this.state.userTest+1})} variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
}
}
 
export default Navbar1;