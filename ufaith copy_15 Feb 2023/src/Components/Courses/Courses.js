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
import MenuDisplay from './MenuDisplay';

function Courses() {

    return(
        <>
        <CustomNavbar />
        <Container>
        <MenuDisplay data={courseData} contentType={"Unit"} heading={"Courses"}/>
        </Container>
        </>
     )
}
export default Courses;