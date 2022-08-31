import app from '../Firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc } from 'firebase/firestore'; 

const Home = () => {

    const db = getFirestore(app);
    const auth = getAuth(); 
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

    return (  
        <div className="home">
            <h2>Homepage</h2>
            <p>Welcome! Login or sign up to access everything.</p>
        </div>

    );
}
 
export default Home;