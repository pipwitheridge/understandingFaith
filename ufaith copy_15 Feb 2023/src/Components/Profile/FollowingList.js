import app from "../../Firebase";
import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

// DISPLAYS WHO USER IS FOLLOWING
function FollowingList () {
    const db = getFirestore(app)
    // Get doc of the current profile's user ID
    const {profileID} = useParams()
    const [value] = useDocument(
      doc(db, 'users', profileID),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }  
    );
// FINAL RETURN
return (
<>
{value &&
<>
<h3>{value.data().displayName}</h3>
<br></br>
<h5>Following:</h5>
{value.data().friends && value.data().friends.map(friend => {
    return <div key={friend.displayName}>{friend.displayName}</div>
})}
</>
}
</>
);
}

export default FollowingList;