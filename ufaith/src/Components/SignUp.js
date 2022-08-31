import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import app from '../Firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 
import { eventWrapper } from '@testing-library/user-event/dist/utils';


class SignUp extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            email: '',
            password: ''
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    handleChange(event) {
      const target = event.target;
      const name = target.name;
      const value = event.target.value


  
      this.setState({
        [name]: value
      });
     
    }

    handleSubmit(event) {

      event.preventDefault(); 

      const auth = getAuth();  
      const email = event.target.email.value;
      const password = event.target.password.value;
      const db = getFirestore(app);

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
      
      

      createUserWithEmailAndPassword(auth, email, password)
      .then(function(user) {
        // get user data from the auth trigger
      const userUid = user.uid; // The UID of the user.
      
    
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

      });

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const Uid = user.uid;
          const email = user.email; // The email of the user.
          console.log('user is signed in');
          setDoc(doc(db, "users", Uid), {
            emailAddress: email
          }); 
        
          // ...
        } else {
          // User is signed out
          // ...
          console.log('user is NOT signed in');
        }
      });
   
      
   } 

   
        render() {

  return (
    <div className="container">
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.value} onChange={this.handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={this.state.value} onChange={this.handleChange}/>
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
    
  );
}}

export default SignUp;
