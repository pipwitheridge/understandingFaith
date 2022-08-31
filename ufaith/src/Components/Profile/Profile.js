import React from 'react';
import usersDummyData from './usersDummyData.json';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';



class Profile extends React.Component {
    

render() {

const userData = usersDummyData.filter(bit => bit.userName==="BillyGraham1956");
const user = userData[0]; 

if(user) {
    return (
        <Container>
        <Row>
        <Card>
        <div className="d-flex justify-content-between pt-2 pb-5 px-2">
           <div>
           <div><h2>{user.userName}</h2></div>  
           <div>{user.bio}</div>  
           </div>
           <div><Button>Add Friend</Button></div>  
        </div>
        </Card>
        </Row>
        </Container>
     
    )
}
     }
}
  
  export default Profile;



