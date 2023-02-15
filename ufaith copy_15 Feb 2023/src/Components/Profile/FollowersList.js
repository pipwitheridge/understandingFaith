import app from "../../Firebase";
import { collection, doc, getFirestore, query, where } from "firebase/firestore";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

// DISPLAYS WHO USER IS FOLLOWING
function FollowersList () {
// Get current profile's data
const {profileID} = useParams()
const db = getFirestore(app)
const [value] = useDocument(
  doc(db, 'users', profileID),
  {snapshotListenOptions: { includeMetadataChanges: true },});
const profileDisplayName = value && value.data().displayName
 // Generate Followers List
 const usersCollection = collection(db, "users")
 const followersData = profileDisplayName && query(usersCollection, where("friends", "array-contains", {displayName: profileDisplayName, uid: profileID}));
 const [users] = useCollectionData(followersData, {idField: 'id'});
return (
    <>
  <h5>Followers:</h5>
  {users && users.map(follower => {
    return <div key={follower.displayName}>{follower.displayName}</div>
  })}
  </>
)
}

export default FollowersList;