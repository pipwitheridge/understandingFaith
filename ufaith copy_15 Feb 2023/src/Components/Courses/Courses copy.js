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


class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showCourses: 'true',
          showUnits: 'false',
          showLessons: 'false',
          showModule: 'false',
          showQuiz: 'false',
          selectedCourse: 0,
          selectedUnit: 0,
          selectedLesson: 0,
          selectedModule: 0,
          quizQuestion: 1,
          activeCorrectAnswers: [],
          activeWrongAnswers: [],
          quizNextOption: "Check Answer",
          comment: '',
          replyActive: '',
          userExists: '',
          selectedCommentsFilter: ''
      };
    
      
      this.showCourses = this.showCourses.bind(this);
      this.showUnits = this.showUnits.bind(this);
      this.showLessons = this.showLessons.bind(this);
      this.showModule = this.showModule.bind(this);
      this.showQuiz = this.showQuiz.bind(this);
      this.renderCourses = this.renderCourses.bind(this);
      this.renderUnits = this.renderUnits.bind(this);
      this.renderLessons = this.renderLessons.bind(this);
      this.renderModule = this.renderModule.bind(this);
      this.renderQuiz = this.renderQuiz.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      this.handleReplySubmit = this.handleReplySubmit.bind(this);

  }



  showCourses() {
   this.setState({
    showCourses: 'true',
    showUnits: 'false',
    showLessons: 'false',
    showModule: 'false',
    showQuiz: 'false',
    selectedCourse: 0,
    selectedUnit: 0,
    selectedLesson: 0,
    selectedModule: 0,
    quizQuestion: 1,
    activeCorrectAnswers: [],
    activeWrongAnswers: [],
    quizNextOption: "Check Answer"  })
   }

   showUnits() {
    this.setState({
     showCourses: 'false',
     showUnits: 'true',
     showLessons: 'false',
     showModule: 'false',
     showQuiz: 'false',
     selectedUnit: 0,
     selectedLesson: 0,
     selectedModule: 0,
     quizQuestion: 1,
     activeCorrectAnswers: [],
     activeWrongAnswers: [],
     quizNextOption: "Check Answer"  })
    }

    showLessons() {
        this.setState({
         showCourses: 'false',
         showUnits: 'false',
         showLessons: 'true',
         showModule: 'false',
         showQuiz: 'false',
         selectedLesson: 0,
         selectedModule: 0,
         quizQuestion: 1,
         activeCorrectAnswers: [],
         activeWrongAnswers: [],
         quizNextOption: "Check Answer"  })
        }

     showModule() {
        this.setState({
            showCourses: 'false',
            showUnits: 'false',
            showLessons: 'false',
            showModule: 'true',
            showQuiz: 'false',
            quizQuestion: 1,
            activeCorrectAnswers: [],
            activeWrongAnswers: [],
            quizNextOption: "Check Answer"  })
        }

        showQuiz() {
            this.setState({
                showCourses: 'false',
                showUnits: 'false',
                showLessons: 'false',
                showModule: 'false',
                showQuiz: 'true',
              })
            }


  renderCourses() {
        return(
            this.state.showCourses==='true'?
           
            <>
        { courseData.map(bit => {
            return(
            <>    
            <Card className="p-2">
            <div className="d-flex justify-content-between align-items-center">
            <div><strong>{bit.courseName}</strong></div>                
            <div><Button className="px-3" onClick={() => this.showUnits() & this.setState({selectedCourse: bit.courseNumber})}>Start</Button></div>
            </div>
            <hr></hr>
            
            { bit.units.map(thing => {
                if(thing.lessons.every(thingy => localStorage.getItem("C"+bit.courseNumber+"U"+thing.unitNumber+"L"+thingy.lessonNumber)==="Completed")) 
                {localStorage.setItem("C"+bit.courseNumber+"U"+thing.unitNumber, "Completed") }
                
            return(
           <>
                    <div className="d-flex justify-content-between align-items-center">
                    <Button onClick={() => this.showLessons() & this.setState({selectedCourse: bit.courseNumber, selectedUnit: thing.unitNumber})} 
                    style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
                    className="d-flex"
                    variant="light">
                   <div> <strong>Unit {thing.unitNumber}: </strong>{thing.unitName}</div>
                    {localStorage.getItem("C"+bit.courseNumber+"U"+thing.unitNumber)==="Completed" 
                    & localStorage.getItem("C"+bit.courseNumber+"U"+thing.unitNumber+"Quiz")==="Completed" 
                    ? <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}
                
                    </Button>
                    </div>
            
            </>
                )
            })}
            </Card>
            <hr></hr>
            </>
            )
        })}

        </>
    
        :null
        )
    
   
    } 


  renderUnits = () => {
   const selectedCourse = this.state.selectedCourse;
   const selectedCourseData = courseData.filter(thing => (thing.courseNumber===selectedCourse)) || null;

        return(
    this.state.showUnits==='true'?
            <>
            <div><Button variant="warning" className="px-3 my-3" onClick={() => this.showCourses()}>{'\u2190'} Back to Courses</Button></div>
            <hr></hr>
            <div>Courses {'\u2192'} <strong>{selectedCourseData[0].courseName}</strong></div>
            <hr></hr>
            <>
        { selectedCourseData[0].units.map(bit => {
                return(
                    <>    
                    <Card className="p-2">
                    <div className="d-flex justify-content-between align-items-center">
                    <div>Unit {bit.unitNumber}: <strong>{bit.unitName}</strong></div>                
                    <div><Button className="px-3" onClick={() => this.showLessons() & this.setState({selectedUnit: bit.unitNumber})}>Start</Button></div>
                    </div>
                    <hr></hr>
                        { bit.lessons.map(thing => {      
                           if(thing.modules.every(thingy => localStorage.getItem("C"+selectedCourse+"U"+bit.unitNumber+"L"+thing.lessonNumber+"M"+thingy.moduleNumber)==="Completed")) 
                           {localStorage.setItem("C"+selectedCourse+"U"+bit.unitNumber+"L"+thing.lessonNumber, "Completed") }
                        return(        
                                <>
                                 <div className="d-flex justify-content-between align-items-center">
                                    <Button onClick={() => this.showModule() & this.setState({selectedUnit: bit.unitNumber, selectedLesson: thing.lessonNumber, selectedModule: 1})} 
                                    className="d-flex"
                                    style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
                                    variant="light">
                                    <div><strong>Lesson {thing.lessonNumber}: </strong>{thing.lessonName}</div>
                                    { thing.modules.every(thingy => localStorage.getItem("C"+selectedCourse+"U"+bit.unitNumber+"L"+thing.lessonNumber+"M"+thingy.moduleNumber)==="Completed") ? 
                                   
                                        <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> 

                                    : null}

                                    </Button>
                                    </div>              
                                </>
                            )

                        })}
                        <div className="d-flex justify-content-between align-items-center">
                         <Button onClick={() => this.setState({selectedUnit: bit.unitNumber}) & this.showQuiz()} 
                                    style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
                                    className="d-flex"
                                    variant="light">
                                    <div>Unit Quiz</div>
                                    {localStorage.getItem(("C"+selectedCourse+"U"+bit.unitNumber+"Quiz")) ? <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}

                                    </Button>
                                    </div>
                    </Card>
                    <hr></hr>
                    </>
                    )
            } 
       )}

        </>
            </>
            :null
        )
    }


    renderLessons = () => {
        const selectedCourse = this.state.selectedCourse;
        const selectedCourseData = courseData.filter(thing => (thing.courseNumber===selectedCourse)) || []; 
        const selectedUnit = this.state.selectedUnit;
        const selectedUnitData = selectedCourseData.flatMap(item => item.units).filter(item => item.unitNumber === selectedUnit);

        return(
         this.state.showLessons==='true'?
                 <>
                <div><Button variant="warning" className="px-3 my-3" onClick={() => this.setState({selectedLesson: 1, selectedModule: 1}) & this.showUnits()}>{'\u2190'} Back to Units</Button></div>
                <hr></hr>
                <div>{selectedCourseData[0].courseName} {'\u2192'} <strong>{selectedUnitData[0].unitName}</strong></div>
                <hr></hr>
                 <>
             { selectedUnitData[0].lessons.map(bit => {
                     return(
                         <>    
                         <Card className="p-2">
                         <div className="d-flex justify-content-between align-items-center">
                         <div><strong>{bit.lessonName}</strong></div>                
                         <div><Button className="px-3" onClick={() => this.setState({selectedLesson: bit.lessonNumber, selectedModule: 1}) & this.showModule()}>Start</Button></div>
                         </div>
                         <hr></hr>
                         
                         {bit.modules.map(thing => {
                            return(
                                <>
                         <div className="d-flex justify-content-between align-items-center">
                                    <Button onClick={() => this.setState({selectedLesson: bit.lessonNumber, selectedModule: thing.moduleNumber}) & this.showModule()} 
                                    className="d-flex"
                                    style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
                                    variant="light">
                                    <div><strong>Module {thing.moduleNumber}: </strong>{thing.moduleName}</div>
                                    {localStorage.getItem(("C"+selectedCourse+"U"+selectedUnit+"L"+bit.lessonNumber+"M"+thing.moduleNumber)) ? <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}
                                    </Button>
                                    </div>    
                                </>
                            )
                         })}
                      
                         </Card>
                         <hr></hr>
                         </>
                         )
                 } 
            )}
     
             </>

             <div className="d-flex justify-content-between align-items-center">

             <Button variant="secondary" onClick={() => this.showQuiz()} 
            className="d-flex"
            style={{width: "100%", textAlign: "left", marginBottom: 5, justifyContent: "space-between", alignItems: "center"}}
            >{'\u2192'} Unit Quiz
            
             {localStorage.getItem(("C"+selectedCourse+"U"+selectedUnit+"Quiz")) ? <IoCheckmarkDoneCircleOutline style={{height: 20, width: 20}} color='Green'/> : null}

            </Button>
                        </div>    

                 </>
                 :null
             )
         }


    // Comments section functions

    handleChange(event) {
      const target = event.target;
      const comment = target.comment;
      const value = event.target.value
      this.setState({
        [comment]: value
      });
     }

    
  handleCommentSubmit = async (event) => {
      event.preventDefault(); 
      const comment = event.target.comment.value;
      const db = getFirestore(app);
      const userID = getAuth().currentUser.uid;
      const userEmail = getAuth().currentUser.email;
      const timeNow = Timestamp.now()
      const moduleID = "C"+this.state.selectedCourse+"U"+this.state.selectedUnit+"L"+this.state.selectedLesson+"M"+this.state.selectedModule
      // Get displayName for above the comments by matching UID in "comments" collection with "user" collection
      const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
      const querySnapshot = await getDocs(q);
      // Add all the info into Firestore using querySnapshot
      querySnapshot.forEach((thing) => {
      const displayName = thing.data().displayName;
      addDoc(collection(db, "comments"), {
      emailAddress: userEmail,
      uid: userID,
      comment: comment,
      time: timeNow,
      moduleID: moduleID,
      displayName: displayName,
      commentType: "original",
      likers: [],
      likeCount: 0,
      replyingTo: ''
      }).then(function(docRef) {
        const thisDoc = doc(db, "comments", docRef.id);
        updateDoc(thisDoc, {
          docID: docRef.id
    })}).catch(function(error) {
        console.error("Error adding document: ", error);
    });
  })};

 handleReplySubmit = async (event) => {
    event.preventDefault(); 
    const comment = event.target.comment.value;
    const db = getFirestore(app);
    const userID = getAuth().currentUser.uid;
    const userEmail = getAuth().currentUser.email;
    const timeNow = Timestamp.now()
    const moduleID = "C"+this.state.selectedCourse+"U"+this.state.selectedUnit+"L"+this.state.selectedLesson+"M"+this.state.selectedModule
    // Get displayName for above the comments by matching UID in "comments" collection with "user" collection
    const q = query(collection(db, "users"), where("emailAddress", "==", userEmail));
    const querySnapshot = await getDocs(q);
    // Add all the info into Firestore using querySnapshot
    querySnapshot.forEach((thing) => {
    const displayName = thing.data().displayName;
    addDoc(collection(db, "comments"), {
    emailAddress: userEmail,
    uid: userID,
    comment: comment,
    time: timeNow,
    moduleID: moduleID,
    displayName: displayName,
    commentType: "reply1",
    likers: [],
    likeCount: 0,
    replyingTo: this.state.replyActive
    })
    .then(function(docRef) {
      const thisDoc = doc(db, "comments", docRef.id);
      updateDoc(thisDoc, {
        docID: docRef.id
      });
    }).catch(function(error) {
      console.error("Error adding document: ", error);
  });
  this.setState({replyActive: ''});
})};

    renderModule = () => {
        const selectedCourse = this.state.selectedCourse;
        const selectedCourseData = courseData.filter(thing => (thing.courseNumber===selectedCourse)) || []; 
        const selectedUnit = this.state.selectedUnit;
        const selectedUnitData = selectedCourseData.flatMap(item => item.units).filter(item => item.unitNumber === selectedUnit);
        const selectedLesson = this.state.selectedLesson;
        const selectedLessonData = selectedUnitData.flatMap(item => item.lessons).filter(item => item.lessonNumber === selectedLesson);
        const selectedModule = this.state.selectedModule;
        const selectedModuleData = selectedLessonData.flatMap(item => item.modules).filter(item => item.moduleNumber === selectedModule);
        const modulesAmount = selectedModuleData.length;
        const nextOrFinish = modulesAmount===selectedModule ? () => this.setState({selectedModule: selectedModule+1}): () => this.showLessons();
        const moduleID = "C"+selectedCourse+"U"+selectedUnit+"L"+selectedLesson+"M"+selectedModule
        const markModuleCompleted = () => localStorage.setItem((moduleID), "Completed")
      
      // Generate Comments Array
      const db = getFirestore(app);
      const commentsRef = collection(db, "comments")
      const q = query(commentsRef, orderBy("likeCount", "desc"), limit(80));
      const [comments] = useCollectionData(q, {idField: 'id'});

      // Get current user's doc
      const currentUser = getAuth(app).currentUser;
      const [currentUserValue] = useDocument(currentUser &&
        doc(db, 'users', currentUser.uid),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

     // const friendsComments = comments && currentUserValue.data().friends && comments.filter((comment) => currentUserValue.data().friends.includes(comment.uid)) || [];


     // (friendsComments ? (this.state.selectedCommentsFilter==="Friends" ? friendsComments : comments && comments) : comments && comments)

        return(
            this.state.showModule==='true'?
            <>
            <div><Button variant="warning" className="px-3 my-3" onClick={() => this.showLessons()}>{'\u2190'} Back to Lessons</Button></div>
            <hr></hr>
            <div>{selectedCourseData[0].courseName} {'\u2192'} {selectedUnitData[0].unitName} {'\u2192'} {selectedLessonData[0].lessonName} {'\u2192'} <strong>{selectedModuleData[0].moduleName}</strong></div>
            <hr></hr>
            <div className="my-2">Watch the video below to complete this module.</div>
           
            <YouTube className="my-2" videoId={selectedModuleData[0].videoLink}></YouTube>
            
            <Button className="my-2" onClick={() => markModuleCompleted() & nextOrFinish()}>{modulesAmount===selectedModule? "Next Module" : "Finish Lesson"}</Button>
            
            
            <hr></hr>
              <Card>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="public">
                  <Nav.Item>
                    <Nav.Link eventKey="public" onClick={() => this.setState({selectedCommentsFilter: "Public"})}>Public</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="following" onClick={() => this.setState({selectedCommentsFilter: "Friends"})}>Following</Nav.Link>
                  </Nav.Item>
                  <Nav.Item eventKey="groups">
                    <NavDropdown title="Dropdown" id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
              { this.state.userExists==='true' ?
              <>
              <Form onSubmit={this.handleCommentSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control name="comment" type="text" placeholder="Write a comment..." value={this.state.value} onChange={() => this.setState({}) & this.handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit">
               Post Comment
              </Button>
            </Form>
              </>
              : <div>Sign up or login to post comments and respond to other comments.</div>
              }
              <hr></hr>
              
                { comments && comments.filter((bit) => bit.commentType==="original" & bit.moduleID===moduleID).map(cmt => {

                  // Timestap in firestore comment 
                  const fsTime = Date.parse(cmt.time.toDate());

                  // Time right now
                  const timeNow = Date.now()

                  // Time since firestore comment timestamp
                  const nowThenDiff = timeNow - fsTime
                  const minute = 1000 * 60;
                  const hour = minute * 60;
                  const day = hour * 24;
                  const week = day * 7;
                  const year = day * 365;
                  const minutes = Math.round(nowThenDiff / minute);
                  const hours = Math.round(nowThenDiff / hour);
                  const days = Math.round(nowThenDiff / day);
                  const weeks = Math.round(nowThenDiff / week);
                  const years = Math.round(nowThenDiff / year);

                  // Handle Comment Like
                  const cll = cmt.likers.length;
                  const cU = getAuth().currentUser.uid;


                  return(
                  <div className="me-10" key={cmt.docID}>
                  <Card style={{backgroundColor: "rgb(240, 240, 240)", marginBottom: 5, borderWidth: 0, padding: 5, paddingLeft: 10, paddingRight: 10, width: "fit-content" }}>
                  <div><Link to={'/profile/'+cmt.uid}><strong>{cmt.displayName}</strong></Link></div>
                  <div>{cmt.comment}</div>
                  </Card>
                  {cll === 1 ? <div>{cll} like</div> : cll > 1 ? <div>{cll} likes</div> : null}
                  <div className="d-flex inline" style={{marginBottom: 10}}>
                  {getAuth(app).currentUser != null? 
                  <>
                  <Button variant="secondary" style={{height: 25, fontSize: 13, textAlign: "center", padding: 3, width: 50}}
                  onClick={cU && !cmt.likers.includes(cU) ? 
                    () => {
                    updateDoc(doc(db, "comments", cmt.docID), {likers: arrayUnion(cU)}).then(() => {
                    updateDoc(doc(db, "comments", cmt.docID), {likeCount: Array(cmt.likers).length})})
                      }
                      : 
                   () => {
                    updateDoc(doc(db, "comments", cmt.docID), {likers: arrayRemove(cU)}).then(() => {
                    updateDoc(doc(db, "comments", cmt.docID), {likeCount: Array(cmt.likers).length-1})})}
                  }
                  >{cmt.likers.includes(cU) ? "Unlike" : "Like"}</Button>
                  <Button variant="secondary" style={{height: 25, fontSize: 13, marginLeft: 10, textAlign: "center", padding: 3, width: 50}}
                  onClick={() => this.setState({replyActive: cmt.docID})}>Reply</Button>
                  </>
                  : null } 
                  <div style={{paddingLeft: 20}}>{minutes < 1 ? "Just now" : 
                  minutes > 0 & hours < 1 ? minutes + " m" :
                  hours > 0 & days < 1 ? hours + " h" :
                  days > 0 & weeks < 1 ? days + " d" :
                  weeks > 0 & years < 1 ? weeks + " w" :
                  year > 0 ? years + " y"
                  : null}</div>
                  </div>
                  {getAuth(app).currentUser != null & this.state.replyActive===cmt.docID ?
                   <Form onSubmit={this.handleReplySubmit}>
                   <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Control name="comment" type="text" placeholder="Write a reply..." value={this.state.value} onChange={() => this.handleChange}/>
                   </Form.Group>
                   <Button variant="primary" type="submit">
                    Post Reply
                   </Button>
                 </Form>
                   
                   : getAuth(app).currentUser === null & this.state.replyActive===cmt.docID ?
                   <div>Sign up or login to post comments and respond to other comments.</div>
                   : null
                   
                 }
                 
                  { comments.filter((thingo) => thingo.replyingTo===cmt.docID).map(thingy => {



                  // Timestap in firestore comment 
                  const fsTimeThingy = Date.parse(thingy.time.toDate());

                  // Time right now
                  const timeNowThingy = Date.now()

                  // Time since firestore comment timestamp
                  const nowThenDiff = timeNowThingy - fsTimeThingy
                  const minute = 1000 * 60;
                  const hour = minute * 60;
                  const day = hour * 24;
                  const week = day * 7;
                  const year = day * 365;
                  const minutes = Math.round(nowThenDiff / minute);
                  const hours = Math.round(nowThenDiff / hour);
                  const days = Math.round(nowThenDiff / day);
                  const weeks = Math.round(nowThenDiff / week);
                  const years = Math.round(nowThenDiff / year);

                  // Handle Comment Like
                    const cllThingy = thingy.likers.length;
                 
                  return(
                  <div>
                  <Card style={{backgroundColor: "rgb(240, 240, 240)", marginBottom: 5, marginLeft: 40, borderWidth: 0, padding: 5, paddingLeft: 10, paddingRight: 10, width: "fit-content" }}>
                  <div><strong>{thingy.displayName}</strong></div>
                  <div>{thingy.comment}</div>
                  </Card>
                  {cllThingy === 1 ? <div style={{marginLeft: 40}}>{cllThingy} like</div> : cllThingy > 1 ? <div style={{marginLeft: 40}}>{cllThingy} likes</div> : null}
                  <div className="d-flex inline" style={{marginBottom: 10, marginLeft: 40}}>
                  {getAuth().currentUser ? 
                  <>
                  <Button variant="secondary" style={{height: 25, fontSize: 13, textAlign: "center", padding: 3, width: 50}}
                  onClick={getAuth(app).currentUser && !thingy.likers.includes(cU) ?
                    () => updateDoc(doc(db, "comments", thingy.docID), {likers: arrayUnion(getAuth().currentUser.uid)}).then(() => {
                    updateDoc(doc(db, "comments", thingy.docID), {likeCount: Array(thingy.likers).length}) 
                    })
                    : 
                    () => updateDoc(doc(db, "comments", thingy.docID), {likers: arrayRemove(getAuth().currentUser.uid)}).then(() => {
                    updateDoc(doc(db, "comments", thingy.docID), {likeCount: Array(thingy.likers).length-1})})
                    }
                    >{thingy.likers.includes(cU) ? "Unlike" : "Like"}</Button>
                  </> : null }
                  <div style={{paddingLeft: 20}}>{minutes < 1 ? "Just now" : 
                  minutes > 0 & hours < 1 ? minutes + " m" :
                  hours > 0 & days < 1 ? hours + " h" :
                  days > 0 & weeks < 1 ? days + " d" :
                  weeks > 0 & years < 1 ? weeks + " w" :
                  year > 0 ? years + " y"
                  : null}</div>
                  </div>
                  </div>
                  )})}

              
                  </div>
                
                )})}
              
        
              </Card.Body>
            </Card>     
            </>
            :null
        )


    }



    renderQuiz = () => {
    const selectedCourse = this.state.selectedCourse;
    const selectedCourseData = courseData.filter(thing => (thing.courseNumber===selectedCourse)) || []; 
    const selectedUnit = this.state.selectedUnit;
    const selectedUnitData = selectedCourseData.flatMap(item => item.units).filter(item => item.unitNumber === selectedUnit) || [];
    const selectedLesson = this.state.selectedLesson;
    const selectedLessonData = selectedUnitData.flatMap(item => item.lessons).filter(item => item.lessonNumber === selectedLesson) || [];
    const selectedModule = this.state.selectedModule;
    const selectedModuleData = selectedLessonData.flatMap(item => item.modules).filter(item => item.moduleNumber === selectedModule) || [];
    const modulesAmount = selectedModuleData.length;
    const quizQuestion = this.state.quizQuestion;
    const quizQuestionData = selectedUnitData.flatMap(item => item.quiz).filter(item => item.questionNumber === quizQuestion);
    const questionsAmount = selectedUnitData.flatMap(item => item.quiz).length;
    const answersAmount = selectedUnitData.flatMap(item => item.quiz).filter(item => item.questionNumber === quizQuestion).flatMap(item => item.correctAnswer).length;
    const activeCorrectAnswers = this.state.activeCorrectAnswers.length;
    const activeWrongAnswers = this.state.activeWrongAnswers.length;
    const activeAnswersTotal = activeCorrectAnswers+activeWrongAnswers;
    const quizID = "C"+selectedCourse+"U"+selectedUnit+"Quiz"
    const markQuizCompleted = () => localStorage.setItem((quizID), "Completed")

        return(
    this.state.showQuiz==='true'?
            <>
            <div><Button variant="warning" className="px-3" onClick={() => this.showUnits()}>{'\u2190'} Back to units</Button></div>
            <hr></hr>
            <div>{selectedCourseData[0].courseName} {'\u2192'} {selectedUnitData[0].unitName} {'\u2192'} <strong>Quiz</strong></div>
            <hr></hr>



            { quizQuestionData.map(bit => {
                     return(
                         <>    
                         <Card className="p-2">
                         <div className="d-flex justify-content-between align-items-center">
                         <div><strong>Question {quizQuestion} of {questionsAmount}</strong></div>                
                         </div>
                         <hr></hr>
                         <div>{bit.question}</div>
                    
            { Object.values(bit.options).map(thing => {
    
                return(
                    <>
                    <Button
                    onClick={ () =>
                        bit.correctAnswer.includes(thing) ?
                        this.setState(prevState => ({activeCorrectAnswers: [...prevState.activeCorrectAnswers, thing]})) 
                                                :
                        !bit.correctAnswer.includes(thing) ?
                        this.setState(prevState => ({activeWrongAnswers: [...prevState.activeWrongAnswers, thing]}))
                        : null
                    }

                    disabled={ this.state.activeCorrectAnswers.includes(thing) || 
                               this.state.activeWrongAnswers.includes(thing) ||
                               ["Next Question", "Try Again", "Finish Quiz"].includes(this.state.quizNextOption) ?
                    "true" : null }

                    style={{width: "100%", textAlign: "left", marginBottom: 5}}
                    
                    className={
                        ["Next Question", "Try Again", "Finish Quiz"].includes(this.state.quizNextOption) &
                        this.state.activeCorrectAnswers.includes(thing) ?
                        "btn-success" 
                        :
                        this.state.quizNextOption==="Try Again" &
                        this.state.activeWrongAnswers.includes(thing) ?
                        "btn-danger"
                        : "btn-light"
                    }
                    >
                    {thing}
                    </Button>

                    
                    </>
                ) }

                
                
                )}
              

              
                <Button onClick={() => 
                this.state.quizNextOption==="Check Answer" &
                answersAmount===activeAnswersTotal &
                activeWrongAnswers===0 &
                questionsAmount!=quizQuestion ?
                this.setState({quizNextOption: "Next Question"}) :
                this.state.quizNextOption==="Check Answer" &
                (answersAmount!=activeCorrectAnswers ||
                activeWrongAnswers>0) ?
                this.setState({quizNextOption: "Try Again"}) :
                this.state.quizNextOption==="Check Answer" &
                answersAmount===activeAnswersTotal &
                activeWrongAnswers===0 &
                quizQuestion===questionsAmount?
                this.setState({quizNextOption: "Finish Quiz"}) :
                this.state.quizNextOption==="Next Question" ?
                this.setState({activeCorrectAnswers: [], activeWrongAnswers: [], quizQuestion: this.state.quizQuestion+1, quizNextOption: "Check Answer"}) :
                this.state.quizNextOption==="Try Again" ?
                this.setState({activeCorrectAnswers: [], activeWrongAnswers: [], quizNextOption: "Check Answer"}) :
                this.state.quizNextOption==="Finish Quiz" ?
                markQuizCompleted() &
                this.showUnits() :
                null
                }
                >{  this.state.quizNextOption==="Check Answer" ?
                    "Check Answer" :
                    this.state.quizNextOption==="Next Question" ?
                    "Next Question" :
                    this.state.quizNextOption==="Try Again" ?
                    "Try Again" :
                    this.state.quizNextOption==="Finish Quiz" ?
                    "Finish Quiz" :
                    null
                }
                </Button>
                    
                      
                         </Card>
                         <hr></hr>
                         </>
                         )
                 } 
            )}

            </>
            :null
        )
    }


    // Initialize Firebase
    componentDidMount() {
      getFirestore(app);
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('user IS SIGNED IN')
          this.setState({userExists: 'true'})
        } else {
          console.log('user is NOT signed in');
        }
      });
      setPersistence(auth, browserLocalPersistence);
    }

    render() {
    return(
        <>
        <CustomNavbar 
        userExists = {this.state.userExists}
        />
        <Container>
        <this.renderCourses />
        <this.renderUnits />
        <this.renderLessons />
        <this.renderModule />
        <this.renderQuiz />
        </Container>
        </>
     )
  }

}

 
export default Courses;