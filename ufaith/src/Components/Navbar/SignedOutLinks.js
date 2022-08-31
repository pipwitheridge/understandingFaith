import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


const SignedOutLinks = () => {
    return (  
        <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/SignUp">Sign-up</Nav.Link>
                <NavDropdown title="Menu" id="offcanvasNavbarDropdown-expand-md">
                    <NavDropdown.Item href="/Courses">Courses</NavDropdown.Item>
                    <NavDropdown.Item href="/Bookshelf">Bookshelf</NavDropdown.Item>
                    <NavDropdown.Item href="/Donate">Donate</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
}
 
export default SignedOutLinks;