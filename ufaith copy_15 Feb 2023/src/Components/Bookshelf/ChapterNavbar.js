import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CgMenuGridR } from 'react-icons/cg';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';


class ChapterNavbar extends React.Component {

    render() { 
        const bookChoice = this.props.bookChoice; 
        const chapterChoice = this.props.chapterChoice; 
        const nextChapter = this.props.nextChapter;
        const previousChapter = this.props.previousChapter;


        return (        
      <Navbar expand="sm">
      <Container>
        <Nav.Link onClick={this.props.handleShow}><CgMenuGridR size={40} className="hoverGrey"/></Nav.Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <this.props.PrevChapterNavLinkRender />
            <Nav.Link style={{ color: 'black', fontSize: '20px' }}>{bookChoice} {chapterChoice}</Nav.Link>
            <this.props.NextChapterNavLinkRender />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    

        );
    }
}
 
export default ChapterNavbar;