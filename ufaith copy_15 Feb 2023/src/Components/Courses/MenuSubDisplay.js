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

function MenuSubDisplay(props) {

    return(
        <>
       { props.data.map(thing => {    
            return(
            <>
                    <div className="d-flex justify-content-between align-items-center">
                    <Link to={props.urlStart+"/"+thing.urlName} style={{width: "100%"}}>
                    <Button 
                    style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
                    className="d-flex"
                    variant="light">
                    <div> <strong>{props.contentType} {thing.number}: </strong>{thing.name}</div>
                    
                    {props.contentType==="Module" && localStorage.getItem(thing.uid) && localStorage.getItem(thing.uid)==="Completed" ?
                    <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}

                    {props.contentType==="Lesson" && thing.subContent.every(thingy => localStorage.getItem(thingy.uid)==="Completed") ?
                    <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}

                    {props.contentType==="Unit" && thing.subContent.every(thing => thing.subContent.every(thingy => localStorage.getItem(thingy.uid)==="Completed")) ?
                    <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}
                    
                    </Button>
                    </Link>
                    </div>
            </>
            )
            })}

        </>
     )
  

}

 
export default MenuSubDisplay;