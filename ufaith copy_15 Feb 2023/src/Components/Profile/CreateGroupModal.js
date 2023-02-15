import React from 'react';
import app from '../../Firebase';
import { Button, Form, Modal } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { getFirestore, arrayUnion, updateDoc, collection, doc, setDoc, Timestamp, Firestore, serverTimestamp, query, where, getDocs, getDoc, orderBy, limit, DocumentSnapshot } from 'firebase/firestore'; 
import { useDocument} from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom';
import { useState } from 'react';


function CreateGroupModal() {

    // INITIALIZE FIREBASE STUFF
    const db = getFirestore(app);
    const signedIn = localStorage.getItem("signedIn")
    const userUID = localStorage.getItem("userUID")
    // INITIALIZE USING THE URL (USER ID) AS A PARAMETER
    const {profileID} = useParams()

    // THE FORM WITHIN THE MODAL WHEN CREATING A NEW GROUP
    function CreateGroupForm() {
      const [currentUserValue] = useDocument(
        doc(db, 'users', userUID),
        {snapshotListenOptions: { includeMetadataChanges: true },}
        );
         function handleFormSubmit(event) {
          event.preventDefault();
          const randomNumber = Math.random().toString();
          console.log("hello")
           updateDoc(doc(db, "users", userUID), {"groups.created": arrayUnion({name: event.target.groupName.value, id: event.target.groupName.value+randomNumber}), "groups.joined": arrayUnion({name: event.target.groupName.value, id: event.target.groupName.value+randomNumber})})
          // Add Group invite to each of the friends selected
          //currentUserValue.data().friends && event.target.addPeople.forEach(thing => {
         // thing.checked ? 
         // updateDoc(doc(db, "users", thing.id), {groups: {invited: arrayUnion({name: event.target.groupName.value+randomNumber, id: event.target.groupName.value+randomNumber})}})
         // : console.log("not checked: " + thing.id)
       // })
      }
      return (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Group Name</Form.Label>
            <Form.Control required={true} type="text" name="groupName" placeholder="Enter group name" />
          </Form.Group>
          <Form.Label>Add People</Form.Label>
      {currentUserValue &&
        <>
        {currentUserValue.data().friends && currentUserValue.data().friends.map(friend => {
          return(
            <>
            <Form.Check 
            type="checkbox"
            name="addPeople"
            id={friend.uid}
            label={friend.displayName}
            friend={friend.displayName}
            />
            </>
          )})}
        </>
        }
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      );
    }

    // THE POP-UP MODAL WHEN CREATING A NEW GROUP
    function CreateGroupModal() {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              Create New Group
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create New Group</Modal.Title>
              </Modal.Header>
              <Modal.Body><CreateGroupForm /></Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </>
        );
      }

    // FINAL RETURN
    return ( 
    signedIn && userUID === profileID ? 
    <CreateGroupModal /> 
    : null
    )
}
     
  export default CreateGroupModal;



