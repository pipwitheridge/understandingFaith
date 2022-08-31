import ThemeProvider, { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider";
import BookshelfCard from "./BookshelfCard";
import ChapterAccordion from "./ChapterAccordion";
import React from "react";
import ChapterText from "./ChapterText";
import { useState } from "react";
import ChapterNavbar from "./ChapterNavbar";
import BibleData from './bibleJSON.json';
import { Card, ListGroup, Nav } from "react-bootstrap";
import { BsArrowRightSquare, BsArrowLeftSquare}  from "react-icons/bs";
import ApocryphaData from './apocryphaJSON.json';
import { IconContext } from "react-icons/lib";
import OffCanvasMenu from "./OffCanvasMenu";
import QuickQuiz from "./QuickQuiz";
import QuranData from './quranJSON.json'
import questionsData from './questions.json'
import {Container, Row, Col} from "react-bootstrap";
import jsonData from './questions.json'
import CommentsSection from "./CommentsSection";



class Bookshelf extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleStartQuizClick = this.handleStartQuizClick.bind(this);
      this.handleMultipleChoiceClick = this.handleMultipleChoiceClick.bind(this);
      this.state = {
        Show: false,
        chapterChoice: '',
        bookChoice: '',
        cardVisibility: true,
        chapterNavbarVisibility: false,
        showNextChapterNav: true,
        showPrevChapterNav: true,
        data: '',
        quickQuiz: 0,
        correctAnswerTally: 0,
    };

  }
  // Close/Show Accordion Menu
  handleClose = (e) => { this.setState({Show: false}); };
  handleShow = (e) => { 
    this.setState({Show: true}); 
    if(e.target.value === 
      "BibleData"){
    this.setState({data: BibleData}); 
    } 
    if(e.target.value === 
      "ApocryphaData"){
    this.setState({data: ApocryphaData}); 
    } 
    if(e.target.value === 
      "QuranData"){
    this.setState({data: QuranData}); 
    this.setState({chapterChoice: 1})
    } 
  };



  QuestionAnswers = () => {
    const bookChoice = this.state.bookChoice;
    const chapterChoice = this.state.chapterChoice; 
    const questionsData = jsonData || [];
    const currentQuestion = questionsData.filter(bit => bit.QuestionNumber===this.state.quickQuiz && bit.bookName===bookChoice && bit.Chapter===parseInt(chapterChoice)) || null;
    const answersArray = currentQuestion[0].Answers || [];
      return(
      <>
        {answersArray && Object.values(answersArray).map((thingy) => {
          return(
            <ListGroup.Item id={thingy} action onClick={this.handleMultipleChoiceClick} className="quizOption">
            {thingy}
            </ListGroup.Item>
        )})}
      </>
      )
    }
  
  // Handle click of Start Quick Quiz Button
  handleStartQuizClick = (e) => {
    const quickQuiz = this.state.quickQuiz; 
    if(e.target.innerHTML==="Quick Quiz"){this.setState({quickQuiz: this.state.quickQuiz+1});}
  }

   // Handle click of checkbox answer
   handleMultipleChoiceClick = (e) => {
    const bookChoice = this.state.bookChoice;
    const chapterChoice = this.state.chapterChoice; 
    const quickQuiz = this.state.quickQuiz; 
    const correctAnswerArray = questionsData.filter(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice) && bit.QuestionNumber === quickQuiz) || [];
    const answerArrayLength = correctAnswerArray[0].Answers.length || null; 
    const correctAnswer = correctAnswerArray[0].CorrectAnswer || [];
    const correctAnswerArrayLength = correctAnswer.length || null;

    // Disable option after click
    document.getElementById(e.target.innerHTML).disabled = true;

    // If correct... else... 
    if(correctAnswer.some((thing) => e.target.innerHTML === thing)) {
      document.getElementById(e.target.innerHTML).style.backgroundColor="rgb(180,250,180)";
      this.setState({correctAnswerTally: this.state.correctAnswerTally+1}, () => {
        if(this.state.correctAnswerTally === correctAnswerArrayLength){
         setTimeout(() => {
          this.setState({quickQuiz: this.state.quickQuiz+1});
          this.setState({correctAnswerTally: 0});
          for(let i = 0; i < answerArrayLength; i++) {
            const elements = document.getElementsByClassName("quizOption");
            elements[i].style.backgroundColor="";
            elements[i].disabled=false; 
            }
        }, 500);
      }
      }
      );
    } else {document.getElementById(e.target.innerHTML).style.backgroundColor="rgb(255,180,180)";}
  }


  // Handle click of Accordion Menu Button
  handleClick = (e) => {
    if(this.state.data!=QuranData){    this.setState({chapterChoice: e.target.innerHTML});  }
    this.setState({bookChoice: e.target.value});
    this.setState({Show: false});
    this.setState({cardVisibility: false});
    this.setState({chapterNavbarVisibility: true});
    this.setState({quickQuiz: 0});
    const data = this.state.data;
    const bookChoice = e.target.value;
    const chapterChoice = e.target.innerHTML; 
    const objectFilter = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)+1);
    this.setState({showNextChapterNav: objectFilter});
    const objectFilterPrev = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)-1);
    this.setState({showPrevChapterNav: objectFilterPrev});
  }


  BookshelfCardRender = () => {
    const cardVisibility = this.state.cardVisibility
      return(
        cardVisibility?<BookshelfCard Show={this.state.Show} handleClose={this.handleClose} handleShow={this.handleShow}
      chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice} handleClick={this.handleClick}/>:null
      ) 
      
    }


  // Only render if the click action of the nav link would produce a chapterText component containing something.

    nextChapter = (e) => {
      const data = this.state.data;
      this.setState({chapterChoice: parseInt(this.state.chapterChoice)+1});
      const bookChoice = this.state.bookChoice;
      const chapterChoice = this.state.chapterChoice; 
      const objectFilter = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)+2);
      const objectFilterPrev = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice));
      this.setState({showNextChapterNav: objectFilter});
      this.setState({showPrevChapterNav: objectFilterPrev});
      this.setState({quickQuiz: 0});
    }  
  
    previousChapter = (e) => {
      const data = this.state.data;
      this.setState({chapterChoice: parseInt(this.state.chapterChoice)-1}); 
      const bookChoice = this.state.bookChoice;
      const chapterChoice = this.state.chapterChoice; 
      const objectFilter = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice));
      const objectFilterPrev = data.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice)-2);
      this.setState({showNextChapterNav: objectFilter});
      this.setState({showPrevChapterNav: objectFilterPrev});
      this.setState({quickQuiz: 0});
    }  

      // Only render the Next Chapter Button if its visibility is set to 'true'
NextChapterNavLinkRender = () => {
  return(
    this.state.showNextChapterNav?<Nav.Link onClick={this.nextChapter}><BsArrowRightSquare className="navArrow hoverGrey"/></Nav.Link>:null
  ) 
}

PrevChapterNavLinkRender = () => {
return(
  this.state.showPrevChapterNav?<Nav.Link onClick={this.previousChapter}><BsArrowLeftSquare className="navArrow hoverGrey"/></Nav.Link>:null
) 
}

   
  // Only render the Navbar once a chapter button has been clicked
  ChapterNavbarRender = () => {
    const chapterNavbarVisibility = this.state.chapterNavbarVisibility;
      return(
        chapterNavbarVisibility?<Card className="px-4 pb-4"><ChapterNavbar data={this.state.data} chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice}
        nextChapter={this.nextChapter} previousChapter={this.previousChapter}
        NextChapterNavLinkRender={this.NextChapterNavLinkRender}
        PrevChapterNavLinkRender={this.PrevChapterNavLinkRender}
        handleShow={this.handleShow}/>
        <ChapterText data={this.state.data} chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice}/>
        </Card>:null

      ) 
  }


// Render the Quick Quiz only when chapter navbar is visible
QuickQuizRender = () => {
      const questionsData = jsonData || [];
      const bookChoice = this.state.bookChoice;
      const chapterChoice = this.state.chapterChoice; 
      const isDataAvailable = questionsData.some(bit => bit.bookName === bookChoice && bit.Chapter === parseInt(chapterChoice));
if (isDataAvailable) {
  const chapterNavbarVisibility = this.state.chapterNavbarVisibility;
  return(
    chapterNavbarVisibility? <QuickQuiz chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice} quickQuiz={this.state.quickQuiz}
    handleStartQuizClick={this.handleStartQuizClick} handleMultipleChoiceClick={this.handleMultipleChoiceClick}
    QuestionAnswers={this.QuestionAnswers}/>:null

  ) 
}  
}

CommentsSectionRender = () => {
  const chapterNavbarVisibility = this.state.chapterNavbarVisibility;
  return(
    chapterNavbarVisibility? <CommentsSection chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice}/>:null
  ) 
}


render() {

    return (
        <div className="container">

          <this.BookshelfCardRender />  

          <OffCanvasMenu data={this.state.data} Show={this.state.Show} handleClose={this.handleClose} handleClick={this.handleClick} 
          chapterChoice={this.state.chapterChoice} bookChoice={this.state.bookChoice}/>

          <Container>

          <Row>

          <Col sm={7}>
            
              <this.ChapterNavbarRender />
            
          </Col>

          <Col sm={5}>
            
            <this.QuickQuizRender/>

            <this.CommentsSectionRender/>
            
         </Col>

         </Row>

         <Row className="my-5"></Row>

         </Container>

        </div>
     
 )}

}
  
  export default Bookshelf;
  





