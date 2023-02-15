
import Accordion from 'react-bootstrap/Accordion';
import { Container, Button } from 'react-bootstrap';
import React from 'react';
import BibleData from './bibleJSON.json';
import ApocryphaData from './apocryphaJSON.json'
import QuranData from './quranJSON.json'


class ChapterAccordion extends React.Component {  

  render() {

    const data = this.props.data; 
    if(data === QuranData) {
        return(
          
          <Container>
          { data.filter(thing => thing.Chapter===1 && thing.Verse===1).map(FilteredThing => {
                    return(
            <Button
            value={FilteredThing.bookName}
            className="BookButtonQuran btn-outline-primary m-1 d-col-12" 
            variant="light" size="md" key={FilteredThing.VerseID} 
            onClick={this.props.handleClick} action="true">{FilteredThing.bookName}</Button>
            )})}

      </Container>
        )
    }

    return (

      <>

{ data.filter(bit => bit.Chapter===1 && bit.Verse===1).map(FilteredBit => {
                return(

      <Accordion flush>
        <Accordion.Item eventKey="0">
         <Accordion.Header key={FilteredBit.bookName} active="true">{FilteredBit.bookName}</Accordion.Header>
          <Accordion.Body className="flex-row text-wrap">
    
          { data.filter(thing => thing.Verse===1 && thing.bookName===FilteredBit.bookName).map(FilteredThing => {
                    return(

            <Button
            value={FilteredBit.bookName}
            className="chapterButton btn-outline-primary m-1 d-col-12" 
            variant="light" size="md" key={FilteredThing.VerseID} 
            onClick={this.props.handleClick} action="true">{FilteredThing.Chapter}</Button>
            )})}
  
            </Accordion.Body>   
        </Accordion.Item>  
      </Accordion>
      )})}



      </>

    );
     }

}


  


 
export default ChapterAccordion;

