import React from 'react';
import ApocryphaData from './apocryphaJSON.json';
import BibleData from './bibleJSON.json';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card, Container } from 'react-bootstrap';
import jsonData from './questions.json'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class QuickQuiz extends React.Component {


render() {
const bookChoice = this.props.bookChoice;
const chapterChoice = this.props.chapterChoice; 
const questionsData = jsonData || [];
const currentQuestion = questionsData.filter(bit => bit.QuestionNumber===this.props.quickQuiz && bit.bookName===bookChoice && bit.Chapter===parseInt(chapterChoice)) || null;
const questionArray = questionsData.filter(bit => bit.bookName===bookChoice && bit.Chapter===parseInt(chapterChoice)) || null;
const answersArray = questionArray[0].Answers || [];
const answersArrayLength = answersArray.length || null;

// Display the start button
if (this.props.quickQuiz===0) {
  return(
    <Card>
    <div className="container m-3">
      <Button onClick={this.props.handleStartQuizClick}>Quick Quiz</Button>
    </div>
    </Card>
  )
}

// Display the congatulations message on quiz completion
if (this.props.quickQuiz > questionArray.length) {
  return(
    <Card>
    <div className="container m-3">
      Congratulations!
    </div>
    </Card>
  )
}


// this const must be defined AFTER the initial card otherwise it doesn't work
const questionType = currentQuestion[0].QuestionType || null;

if (this.props.quickQuiz!=0 && questionType==="MultipleChoice") {
  return(
    <>
    { questionsData.filter(bit => bit.QuestionNumber===this.props.quickQuiz && bit.bookName===bookChoice && bit.Chapter===parseInt(chapterChoice)).map(FilteredBit => {
      return(
        <>
          <Card>
          <Card.Body>
          <p>{FilteredBit.Question}</p>
          <ListGroup>
          <this.props.QuestionAnswers/>
        </ListGroup>
        </Card.Body>
        </Card>
      </> 
    )
    })}
</>
  )
}

}
}
  
  export default QuickQuiz;



