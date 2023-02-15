import React from 'react';
import app from '../../Firebase';
import { Button, Form, Modal } from 'react-bootstrap';
import { getAuth} from 'firebase/auth';
import { arrayRemove, updateDoc, collection, doc, query, where, getFirestore } from 'firebase/firestore'; 
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

// LIST OF JOINED GROUPS
function MyGroups() {

    const db = getFirestore(app);
    const userUID = localStorage.getItem("userUID")
    const [currentUserValue] = useDocument(doc(db, 'users', userUID), {snapshotListenOptions: {includeMetadataChanges: true},});
    const myGroups = currentUserValue && currentUserValue.data().groups.joined;
    
    // INITIALIZE USING THE URL (USER ID) AS A PARAMETER
    const {profileID} = useParams()   

  return (
    <>
    <h5>Groups Joined</h5>
    {userUID===profileID ? myGroups && myGroups.map(group => {
      return(
        <>
        <div key={group}>{group.name} 
        </div>
        </>
      )
    }) : <></>}
    
            </>
          );
        }

  export default MyGroups;