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
import { Link, useParams, useNavigate } from 'react-router-dom';
import MenuDisplay from './MenuDisplay';
import CommentsSection from './CommentsSection';
import { useState } from 'react';

function Quiz() {

const {courseID, unitID} = useParams()
const courseName = courseData.filter(bit => bit.urlName===courseID)[0].name
const courseURL = courseData.filter(bit => bit.urlName===courseID)[0].urlName
const unitName = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].name
const unitURL = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].urlName
const questionsAmount = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].quiz.length

const QuestionNumberHeading = (props) => {
return(
  <div><strong>Question {props.qNumber} of {questionsAmount}</strong></div>
)
}

const [questionNo, setQuestionNo] = useState(1)


const QuestionForm = (props) => {
const [selectedAnswers, setSelectedAnswers] = useState([])
const [nextButtonLabel, setNextButtonLabel] = useState("Check Answer")
const [disabledSetting, setDisabledSetting] = useState(false)
const [checkedStatus, setCheckedStatus] = useState()
const [finishLink, setFinishLink] = useState()
const navigate = useNavigate()


  const handleSelect = (selectedOption) => {
    !selectedAnswers.includes(selectedOption) ? setSelectedAnswers([...selectedAnswers, selectedOption])
    : setSelectedAnswers(selectedAnswers.filter(x =>  x !== selectedOption))
  }

  const handleSubmit = () => {
  setDisabledSetting(true);

  if(selectedAnswers.every(bit => props.correctAnswers.includes(bit)) &
    props.correctAnswers.every(bit => selectedAnswers.includes(bit))) {
    setNextButtonLabel("Next Question");
  }
  else {
    setNextButtonLabel("Try Again");
  }

  if(nextButtonLabel==="Next Question") {
    setQuestionNo(questionNo+1)
    console.log(questionNo)
    console.log(questionsAmount)
  }

  if(nextButtonLabel==="Try Again") {
    setDisabledSetting(false);
    setSelectedAnswers([])
    setNextButtonLabel("Check Answer");
  }
  if(selectedAnswers.every(bit => props.correctAnswers.includes(bit)) &
    props.correctAnswers.every(bit => selectedAnswers.includes(bit)) &
    questionNo===questionsAmount) {
    setNextButtonLabel("Finish");
  }
  if(nextButtonLabel==="Finish") {
    localStorage.setItem(unitURL+"/Quiz", "Completed")
    navigate('/Courses/'+courseURL+'/'+unitURL);
  }
  }

  return(
    <>
    <Form name="formy" onLoad={() => setCheckedStatus()}
>
    {props.questionData.map(thing => {
      return(
        <>
            <Form.Check
              className="formCheck"
              checked={selectedAnswers.includes(thing) ? true : false}
              disabled={disabledSetting} 
              key={thing}
              type={`checkbox`}
              name={"checky"}
              id={thing}
              label={thing}
              value={thing}
              onClick={() => handleSelect(thing)}
              style={{color: selectedAnswers.includes(thing) & props.correctAnswers.includes(thing) ? 
                            nextButtonLabel==="Try Again" ? "orange" : 
                            nextButtonLabel===("Next Question" || "Finish") ? "green" : null :
                            selectedAnswers.includes(thing) & nextButtonLabel!="Check Answer" ? "red": null}}
            />  
        </>

      )})} 
<Button onClick={() => handleSubmit()}>{nextButtonLabel}</Button>

</Form>
    </>
  )
}

const data = courseData.filter(bit => bit.urlName===courseID)[0].subContent.filter(bit => bit.urlName===unitID)[0].quiz.filter(bit => bit.questionNumber===questionNo)

return(
    <>
    <CustomNavbar />
    <Container>
    <div>Courses{" \u2192 "}{courseName}{" \u2192 "}{unitName}{" \u2192 "}Quiz</div>
    <div>Quiz time!</div>      
    <hr></hr>
    <>
    <Card className="p-2">
    {data.map(bit => {
    return(
    <>
   <div className="d-flex justify-content-between align-items-center">
    <QuestionNumberHeading qNumber={bit.questionNumber}/>                
    </div>
    <hr></hr>
    <div>{bit.question}</div> 
    
<QuestionForm questionData={bit.options} correctAnswers={bit.correctAnswer}/>
    </>
    )})}
    </Card>
    <hr></hr>
    </>
    </Container>
    </>
    )
}


export default Quiz;