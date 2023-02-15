import React from 'react';
import app from '../../Firebase';
import { Button, Form, Modal } from 'react-bootstrap';
import { getAuth} from 'firebase/auth';
import { arrayRemove, updateDoc, collection, doc, query, where, getFirestore } from 'firebase/firestore'; 
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

// LIST OF JOINED GROUPS
function MyGroupsExtra() {

    const db = getFirestore(app);
    const userUID = localStorage.getItem("userUID")
    const [currentUserValue] = useDocument(doc(db, 'users', userUID), {snapshotListenOptions: {includeMetadataChanges: true},});
    const myGroups = currentUserValue && currentUserValue.data().groups;
    // INITIALIZE USING THE URL (USER ID) AS A PARAMETER
    const {profileID} = useParams()   

    /*
    // BUTTON TO LEAVE GROUP
      const LeaveGroupButton =(props) => {
      const thisGroupName = props.groupName;
      const thisGroupID = props.groupID;
      const leaveGroup = () => updateDoc(doc(db, "users", userUID), {groups: {joined: arrayRemove({name: thisGroupName, id: thisGroupID})}})
      const handleClick = () => leaveGroup();
      return <Button onClick={handleClick}>Leave Group</Button>
    }

    // FORM WITHIN MODAL TO SELECT WHO TO REMOVE
  function ManageGroupForm(props) {
    // Generate group members List
    const usersCollection = collection(db, "users")
    const membersData = query(usersCollection, where("joined", "array-contains", {name: props.groupName, id: props.groupID}));
    const [groupMembers] = useCollectionData(membersData);
      const handleFormSubmit = (event) => {
        event.preventDefault();
        event.target.removePeople.forEach(thing => {
        thing.checked ? 
        updateDoc(doc(db, "users", thing.id), {groups: {joined: arrayRemove({name: props.groupName, id: props.groupID})}})
        : console.log("not checked: " + thing.id)
      })}
    return (
      <Form onSubmit={handleFormSubmit}>
      <Form.Label>Remove People</Form.Label>
    {groupMembers &&
      <>
      {groupMembers && groupMembers.map(member => {
        return(
          currentUser && 
          <>
          <Form.Check 
          type="checkbox"
          name="removePeople"
          id={member.displayName}
          label={member.displayName}
          memberName={member.displayName}
          />
          </>
        )})}
      </>
      }
        <Button variant="primary" type="submit">Submit</Button>

      </Form>
    );
  }

  // Pop-Up modal when removing group members
  function ManageGroupModal(props) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Manage Group Members
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Manage Group Members</Modal.Title>
            </Modal.Header>
            <Modal.Body><ManageGroupForm groupName={props.groupName} groupID={props.groupID}/></Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    */

    //<LeaveGroupButton groupID={group.id} groupName={group.name}/>
    //<ManageGroupModal groupID={group.id} groupName={group.name}/>

    

  return (
    <>
    {userUID===profileID ? myGroups && myGroups.joined && myGroups.joined.map(group => {
      return(
        <>
        <div>Groups Joined</div>
        <div>{group.name} 
        </div>
        </>
      )
    }) : <></>}
    {userUID===profileID && myGroups && myGroups.invited ? myGroups.map(group => {
      return(
        <>
        <div>Group Invites</div>
        <div>{group.name} 
        </div>
        </>
      )
    }) : <></>}
            </>
          );
        }

  export default MyGroupsExtra;