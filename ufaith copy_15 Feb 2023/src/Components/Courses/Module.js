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
import { Link, useParams } from 'react-router-dom';
import MenuDisplay from './MenuDisplay';
import CommentsSection from './CommentsSection';

function Module() {

const {courseID, unitID, lessonID, moduleID} = useParams()
const data = moduleID ? courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].subContent.filter(bit => bit.urlName===lessonID)[0].subContent.filter(bit => bit.urlName===moduleID)[0] : courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].subContent.filter(bit => bit.urlName===lessonID)[0].subContent[0]
const currentLessonModules = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].subContent.filter(bit => bit.urlName===lessonID)[0]
const lessonModulesAmount = currentLessonModules.subContent.length
const currentModuleIndex = (currentLessonModules.subContent).findIndex(bit => bit.urlName===moduleID)
const isFinalModule = lessonModulesAmount === currentModuleIndex + 1
const nextModuleURL = !isFinalModule && moduleID ? courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].subContent.filter(bit => bit.urlName===lessonID)[0].subContent[currentModuleIndex+1].urlName : courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].subContent.filter(bit => bit.urlName===lessonID)[0].subContent[1].urlName
const currentLessonURL = "/Courses/"+courseID+"/"+unitID+"/"+lessonID+"/"
const currentUnitURL = "/Courses/"+courseID+"/"+unitID+"/"
const markCompleted = () => {localStorage.setItem(data.uid, "Completed")}
const courseName = courseData.filter(bit => bit.urlName===courseID)[0].name
const unitName = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].name
const lessonName = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].subContent.filter(bit => bit.urlName===lessonID)[0].name
const moduleName = data.name


    const NextButton = () => {
    return(
    isFinalModule ? 
    <><Link to={currentUnitURL}><Button onClick={() => markCompleted()}>Finish Lesson</Button></Link></>
    : 
    <><Link to={currentLessonURL+nextModuleURL}><Button onClick={() => markCompleted()}>Next Module</Button></Link></>
    )}

return(
    <>
    <CustomNavbar />
    <Container>
    <div>Courses{" \u2192 "}{courseName}{" \u2192 "}{unitName}{" \u2192 "}{lessonName}{" \u2192 "}{moduleName}</div>
    <YouTube className="my-2" videoId={data.videoLink}></YouTube>
    <NextButton />
    <hr></hr>
    <CommentsSection section={data.uid} />
    </Container>
    </>
    )
}


export default Module;