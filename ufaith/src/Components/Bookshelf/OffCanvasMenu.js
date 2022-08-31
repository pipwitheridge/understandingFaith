import React, { Component, createContext, useState } from 'react';
import { Card, OffcanvasTitle } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChapterAccordion from './ChapterAccordion';
import Row from 'react-bootstrap/Row'



class OffCanvasMenu extends React.Component {


render() {
    
  return(
 
<>

  <Offcanvas placement="start" name="start" show={this.props.Show} onHide={this.props.handleClose} data={this.props.data}>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <ChapterAccordion data={this.props.data} chapterChoice={this.props.chapterChoice} bookChoice={this.props.bookChoice} handleClick={this.props.handleClick}/>
    </Offcanvas.Body>
  </Offcanvas>


</>
    
   
    )}

}

export default OffCanvasMenu;