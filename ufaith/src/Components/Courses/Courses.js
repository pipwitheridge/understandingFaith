
import React from 'react';
import courseData from './courses.json'
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FcGlobe, FcLike, FcKindle, FcPanorama, FcMindMap } from 'react-icons/fc';

class Courses extends React.Component {


    render() {
        
    return(
        
        <Container>
        { courseData.map(bit => {
            return(
            <>
            <Row>
                <Col>
                
            <Card className="p-2">
            <div><strong>{bit.courseName}</strong></div>
            <hr></hr>
            
            { bit.Modules.map(thing => {
            
            const renderIcon = function () {
                if(thing.moduleIcon==="globe"){
                    return(
                        <FcGlobe />
                    )
                }
                if(thing.moduleIcon==="heart"){
                    return(
                        <FcLike />
                    )
                }
                if(thing.moduleIcon==="history"){
                    return(
                        <FcPanorama />
                    )
                }
                
                if(thing.moduleIcon==="target"){
                    return(
                        <FcMindMap />
                    )
                }
                if(thing.moduleIcon==="texts"){
                    return(
                        <FcKindle />
                    )
                }
            }

            return(
            <div className="d-flex justify-content-between align-items-center">
                <div className="my-3 d-flex align-items-center">
                    <div className="me-2 d-flex align-items-center">{renderIcon()}</div>
                    <div>{thing.moduleName}</div>
                </div>   
                <div><Button className="px-3">Start</Button></div>
            </div>
            
                )
            })}
            </Card>
            <hr></hr>
            </Col>
                <Col>
                </Col>
            </Row>
            </>
            )
        })}
        </Container>
     
     )
  }

}

 
export default Courses;