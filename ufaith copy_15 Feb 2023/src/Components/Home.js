import React from 'react'
import app from '../Firebase';
import { Form, Button, Navbar, Container, Offcanvas, Nav, NavDropdown } from 'react-bootstrap'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, browserSessionPersistence } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 
import logo from '../Components/uFaithLogo.svg'
import CustomNavbar from './Navbar';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Home',
      email: '',
      password: '',
      displayName: '',
      userExists: ''
  };
  this.showHome = this.showHome.bind(this);
  this.showSignUp = this.showSignUp.bind(this);
  this.showLogin = this.showLogin.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
}

// Initialize Firebase
componentDidMount() {
  getFirestore(app);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user IS SIGNED IN')
      this.setState({userExists: 'true'})
    } else {
      console.log('user is NOT signed in');
    }
  });
  setPersistence(auth, browserLocalPersistence);
}

// Show and Render Home

showHome = () => {
  this.setState({currentPage: 'Home'});
}

renderHome = () => {
  const userEmail = localStorage.getItem("userEmail");
  return(
    this.state.currentPage==="Home" ?
    <div className="home">
     { userEmail != null ?
    <p>Welcome to Understanding Faith! You are signed in with the email {userEmail}</p>
     :
     <p>Welcome to Understanding Faith! Login or sign up to access everything.</p>
     } 
    </div>
    : null
  )
}

// Handle Logout

handleLogout = () => {
  this.setState({currentPage: 'Home', userExists: 'false'})
  const auth = getAuth(app);
  signOut(auth);
}

// SignUp & Login Functions

handleChange(event) {
  const target = event.target;
  const name = target.name;
  const value = event.target.value
  this.setState({[name]: value});
}

handleSignUpSubmit(event) {
  
  event.preventDefault();

  const auth = getAuth(app);  
  const email = event.target.email.value;
  const password = event.target.password.value;
  const displayName = event.target.displayName.value;
  const db = getFirestore(app);

  setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  });

  createUserWithEmailAndPassword(auth, email, password, displayName);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const Uid = user.uid;
      const email = user.email; // The email of the user.
      const displayName = this.state.displayName;
      console.log('user is signed in');
      setDoc(doc(db, "users", Uid), {
        emailAddress: email,
        displayName: displayName
      }); 
      this.setState({currentPage: 'Home', userExists: 'true'})
      // ...
    } else {
      // User is signed out
      // ...
      console.log('user is NOT signed in');
    }
  });
}


handleLoginSubmit(event) {
  
  event.preventDefault();

  const auth = getAuth(app);  
  const email = event.target.email.value;
  const password = event.target.password.value;

  setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const Uid = user.uid;
      this.setState({currentPage: 'Home', userExists: 'true'})
      // ...
    } else {
      // User is signed out
      // ...
      console.log('user is NOT signed in');
      this.setState({currentPage: 'Home', userExists: 'false'})

    }
  });

}

// Show and Render SignUp

showSignUp = () => {
  this.setState({currentPage: 'SignUp'});
}

renderSignUp = () => {
  return(
    this.state.currentPage==="SignUp" ?
    <div className="container">
    <Form onSubmit={this.handleSignUpSubmit}>
    <Form.Group className="mb-3" controlId="formBasicDisplayName">
        <Form.Label>Display Name</Form.Label>
        <Form.Control required={true} name="displayName" type="text" placeholder="Choose display name" value={this.state.value} onChange={this.handleChange}/>
        <Form.Text className="text-muted">
          Your display name appears above comments you make and helps friends find/add you. You can use your real name {'\u0028'}recommended{'\u0029'} or something else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required={true} name="email" type="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required={true} name="password" type="password" placeholder="Choose password" value={this.state.value} onChange={this.handleChange}/>
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  </div>
  : null
  )
  
}

// Show and Render Login
showLogin = () => {
  this.setState({currentPage: 'Login'});
}

renderLogin = () => {
  return(
    this.state.currentPage==="Login" ?
          <Form onSubmit={this.handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Enter password" value={this.state.value} onChange={this.handleChange}/>
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Form.Text className="text-muted">
                Don't Have an account? Sign up via the menu at the top of the page.
            </Form.Text>
          </Form>  
    :null
    )
}

render() {
    return (  
      <>
      <CustomNavbar 
      showHome = {this.showHome}
      showSignUp = {this.showSignUp}
      showLogin = {this.showLogin}
      handleChange = {this.handleChange}
      handleSignUpSubmit = {this.handleSignUpSubmit}
      handleLoginSubmit = {this.handleLoginSubmit}
      handleLogout = {this.handleLogout}
      userExists = {this.state.userExists}
      />
    <Container>
    <this.renderHome />
    <this.renderSignUp />
    <this.renderLogin />
    </Container>
    </>
    );
}
}
 
export default Home;