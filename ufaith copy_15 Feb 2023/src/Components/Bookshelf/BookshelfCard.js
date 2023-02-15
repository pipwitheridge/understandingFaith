import React, { Component, createContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChapterAccordion from './ChapterAccordion';
import Row from 'react-bootstrap/Row'



class BookshelfCard extends React.Component {


render() {
  return(
  <div className="container">
<div className="d-flex flex-wrap justify-content-start wrap-sm">
 <Card className="col-sm-4 me-4">
  <Card.Header>Bookshelf &#62; Christianity</Card.Header>
  <Card.Body>
    <Card.Title>The Bible</Card.Title>
    <Card.Text>
      Discover the central text of Christianity.
    </Card.Text>
    <Button value='BibleData' variant="primary" onClick={this.props.handleShow}>Open</Button>
  </Card.Body>
</Card>
<Card className="col-sm-4 me-4">
  <Card.Header>Bookshelf &#62; Christianity</Card.Header>
  <Card.Body>
    <Card.Title>The Apocrypha</Card.Title>
    <Card.Text>
      Discover the deuterocanonical texts of Christianity.
    </Card.Text>
    <Button value="ApocryphaData" variant="primary" onClick={this.props.handleShow}>Open</Button>
  </Card.Body>
</Card>
</div>
<hr></hr>
<div className="d-flex flex-wrap justify-content-start wrap-sm">
<Card className="col-sm-4 me-4">
  <Card.Header>Bookshelf &#62; Islam</Card.Header>
  <Card.Body>
    <Card.Title>The Quran</Card.Title>
    <Card.Text>
      Discover the central text of Islam.
    </Card.Text>
    <Button value="QuranData" variant="primary" onClick={this.props.handleShow}>Open</Button>
  </Card.Body>
</Card>
</div>
</div>
    
   
    )}

}

export default BookshelfCard;