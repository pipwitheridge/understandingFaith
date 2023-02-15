import React, { createContext, useContext, useEffect } from 'react';
import app from '../../Firebase';
import CustomNavbar from '../Navbar';
import { Container, Row, Col, Button, Card, Form, Modal } from 'react-bootstrap';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, getSnapshot, addDoc, arrayUnion, arrayRemove, updateDoc, collection, doc, setDoc, Timestamp, Firestore, serverTimestamp, query, where, getDocs, getDoc, orderBy, limit, DocumentSnapshot } from 'firebase/firestore'; 
import { useCollectionData, useDocument, useDocumentData, useCollection } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import FollowingList from './FollowingList';
import FollowersList from './FollowersList';
import MyGroups from './MyGroups';
import CreateGroupModal from './CreateGroupModal';
import SearchPeople from '../SearchPeople';

function Profile() {

    // INITIALIZE FIREBASE STUFF
    const db = getFirestore(app);
    const auth = getAuth(app);
    const currentUser = getAuth(app).currentUser;
    const signedIn = localStorage.getItem("signedIn")
    const userUID = localStorage.getItem("userUID")


    // INITIALIZE USING THE URL (USER ID) AS A PARAMETER
    const {profileID} = useParams()
    // LIST OF GROUP INVITES
    function GroupInvites(props) {
      const [currentUserValue] = useDocument(currentUser &&
        doc(db, 'users', userUID),
        {snapshotListenOptions: { includeMetadataChanges: true },}
      );
      const AcceptGroupInviteButton = (props) => {
      const thisGroupName = props.groupName;
      const thisGroupID = props.groupID;
      const acceptInvite = () => updateDoc(doc(db, "users", userUID), {groups: {invited: arrayRemove({name: thisGroupName, id: thisGroupID}), joined: arrayUnion({name: thisGroupName, id: thisGroupID})}})
      const handleClick = () => acceptInvite();
      return <Button onClick={handleClick}>Accept Invite</Button>
      }
    return(
      <>
      {currentUserValue && userUID === profileID && currentUserValue.data().groups.invited ? 
      currentUserValue.data().groups.invited.map(invite => {
      return(
        <>
        <div>Group Invites</div>
        <div>{invite.name} <AcceptGroupInviteButton groupID={invite.id} groupName={invite.name}/></div>
        </>
      )})
      : <></>}
      </>
    )}

    // DISPLAYS ADD FRIEND BUTTON (ONLY IF USER ISN'T ALREADY A FRIEND)
    function AddFriendButton() {
       // Get doc of the current profile's user ID
       const [value] = useDocument(
        doc(db, 'users', profileID),
        {snapshotListenOptions: { includeMetadataChanges: true },}
      );
      // Get doc of the current signed in User's ID
      const [currentUserValue] = useDocument(currentUser &&
        doc(db, 'users', userUID),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );
       const addFriend = () => {
        updateDoc(doc(db, "users", userUID), {friends: arrayUnion({uid: profileID, displayName: value.data().displayName})})
       }
      return (
        <>
         { signedIn && value && currentUserValue ?
        <>
        {userUID != profileID & (currentUserValue.data().friends ? !currentUserValue.data().friends.includes(profileID) : !currentUserValue.data().friends) ?
        <> 
        <Button onClick={() => addFriend()}>Follow</Button>
        </>      
        : null}
      </>
      : null }
      </>
      );};


    // FINAL RETURN
    return (
        <>
        <CustomNavbar />
        <Container>
        <Row>
        <Card className="py-3">
        <div>
        <div>
        {signedIn && profileID===userUID && <>
        <div><SearchPeople /></div>
        <br></br>
        </>} 
        <FollowingList /> 
        <br></br>
        <FollowersList />
        <hr></hr>
        </div>
        {signedIn && <AddFriendButton />} 
        </div>
        </Card>
        </Row>
        </Container>
        </>
    )
}
     
  export default Profile;



