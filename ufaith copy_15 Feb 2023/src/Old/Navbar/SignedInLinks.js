import React from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoutButton from './LogoutButton';


class SignedInLinks extends React.Component {

render() {
    return (  
        <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/Bookshelf">Bookshelf</Nav.Link>
            <Nav.Link href="/Courses">Courses</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
                <NavDropdown title="More" id="offcanvasNavbarDropdown-expand-md">
                    <NavDropdown.Item href="/Donate">Donate</NavDropdown.Item>
                        <NavDropdown.Divider />
                            <LogoutButton />
            </NavDropdown>
        </Nav>
    );
}}
 
export default SignedInLinks;