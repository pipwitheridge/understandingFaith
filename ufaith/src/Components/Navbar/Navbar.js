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


const Navbar1 = () => {

// CHANGE THIS CONST WHEN CONNECTING W FIREBASE
const user = true; 
function VariableLinkRender() {
  if(user) {
  return(
    <SignedInLinks />
  )
}
  else {
    return(
      <SignedOutLinks />
    )
  }
}

    return (  
        <Navbar key="md" bg="light" expand="md" className="mb-3 bg-white shadow-sm">
          <Container fluid>
            <Navbar.Brand><Link to="/home"><img src={logo} className="fluid"></img></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
            <Navbar.Offcanvas id="offcanvasNavbar-expand-md" aria-labelledby="offcanvasNavbarLabel-expand-md" 
                            placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <VariableLinkRender />
                <Form className="d-flex">
                  <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
}
 
export default Navbar1;