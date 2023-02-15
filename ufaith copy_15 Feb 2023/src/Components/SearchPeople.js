import React, { useState, useEffect } from "react";
import app from '../Firebase';
import { collection, doc, getDocs, getDoc, getFirestore, query, where } from "firebase/firestore";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchPeople() {

  // Initialize firestore
  const db = getFirestore(app)

  // Load firestore users collection
  const [value] = useCollection(
      collection(db, 'users'),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    );

      // On load, populate the array 'firestoreUsers' with all the objects from the firestore collection of users.
      const firestoreUsers = []
      value && value.forEach((thing) => firestoreUsers.push({"userName": thing.data().displayName.toLowerCase(), "userID": thing.id}))

      // Get what's typed in the search bar, as well as all the matches ("searchedResults")
      const [searchValue, setSearchValue] = useState()
      const [searchedResults, setSearchedResults] = useState([])

      const handleChange = (event) => {
      setSearchValue(event.target.value)
      setSearchedResults([])
      }
      
      firestoreUsers.forEach(user => {
        if(searchValue!="" & user.userName.includes(searchValue) & !searchedResults.length<5 & !searchedResults.some(thing => thing.userID === user.userID)) {
          console.log(user)
          setSearchedResults(searchedResults => [...searchedResults, {"userName": user.userName, "userID": user.userID}])
          }
      })
      
      const SearchedUsers = () => {
      if(searchedResults.length>0)
        return(
          <div style={{marginBottom: "800px"}}>
            <hr></hr>
          <Card style={{marginTop: "5px", marginBottom: "100px", backgroundColor: "rgb(245,245,245)", padding: "5px"}}>
          {searchedResults.map(user => {
          return( <Link to={"/profile/"+user.userID}><div>{user.userName}</div></Link>)
          })}
          </Card>
          </div> 
        )
      }
      
// FINAL RETURN
return(
    <>
      <>
        <div>
        <Form>
          <Form.Control placeholder="Search for people to follow." type="text" name="searchy" id="searchy" onChange={handleChange}/>
          <SearchedUsers />
        </Form>
        </div>
        </>
    </>
)
}
    
export default SearchPeople;

