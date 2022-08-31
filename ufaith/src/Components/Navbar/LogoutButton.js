import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAuth, signOut } from "firebase/auth";
import React from 'react';

class LogoutButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    handleClick = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
    };
    render() {
      return (
        <NavDropdown.Item onClick={()=> this.handleClick()} href="/Home">Logout</NavDropdown.Item>
    )}
  }

 
export default LogoutButton;