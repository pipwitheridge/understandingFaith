import React from 'react';
import app from '../../Firebase';
import courseData from './courses.json'
import { Container, Card, Row, Col, Button, ListGroup, Form, Nav, NavDropdown } from 'react-bootstrap';
import { buildTimeValue } from '@testing-library/user-event/dist/utils';
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import YouTube from 'react-youtube';
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5';
import {FcLike} from 'react-icons/fc'
import dummyData from '../Bookshelf/commentsDummyData.json'
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, addDoc, arrayUnion, arrayRemove, updateDoc, collection, doc, setDoc, Timestamp, Firestore, serverTimestamp, query, where, getDocs, getDoc, orderBy, limit, DocumentSnapshot } from 'firebase/firestore'; 
import { useCollectionData, useDocumentData, useCollection, useDocument } from 'react-firebase-hooks/firestore'
import CustomNavbar from '../Navbar';
import { Link } from 'react-router-dom';
import MenuSubDisplay from './MenuSubDisplay';


function MenuDisplay(props) {
    console.log(props.data[0].urlName)
    return(
        <>
        <div className="mb-3">{props.heading}</div>
        { props.data.map(bit => {
            return(
            <>    
            <Card className="p-2">
            <div className="d-flex justify-content-between align-items-center">
            <div><strong>{bit.name}</strong></div>                
            <div><Link to={bit.urlName}><Button className="px-3">Start</Button></Link></div>
            </div>
            <hr></hr>
            <MenuSubDisplay data={bit.subContent} urlStart={bit.urlName} contentType={props.contentType}/>
            
            {props.data[0].contentType==="Unit" ? 
            <Link to={bit.urlName+"/quiz"} style={{width: "100%"}}>
            <Button 
            style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
            className="d-flex"
            variant="light">
            <div>Unit Quiz</div>
            {localStorage.getItem(bit.urlName+"/Quiz")==="Completed" ? 
            <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}
            </Button>
            </Link>
            : null }
        
            </Card>
            <hr></hr>
            </>
            )
        })}
        <div className="mb-5">
        {props.data[0].contentType==="Lesson" ? 
            <Link to={"quiz"} style={{width: "100%"}}>
            <Button 
            style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
            className="d-flex"
            variant="light">
            <div><strong>Unit Quiz</strong></div>
            {localStorage.getItem(props.unitURL+"/Quiz")==="Completed" ? 
            <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}
            </Button>
            </Link>
            : null }
        </div>
        </>
     )
  

}

 
export default MenuDisplay;