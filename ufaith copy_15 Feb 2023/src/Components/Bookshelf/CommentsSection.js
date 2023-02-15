import React from 'react';
import { Card, Nav, Button, Form, Container} from 'react-bootstrap';
import dummyData from './commentsDummyData.json';
import { FcLike } from 'react-icons/fc';


class CommentsSection extends React.Component {

render() {
  const chapterChoice = this.props.chapterChoice;
  const bookChoice = this.props.bookChoice;
  const thisChapterCommentsUnsorted = dummyData.filter(bit => bit.Book===bookChoice && bit.Chapter===parseInt(chapterChoice));
  const thisChapterCommentsSorted = thisChapterCommentsUnsorted.sort(function(comment1, comment2) {
    return comment2.Likers.length - comment1.Likers.length;
  });


// get commentsNumber based on the number of first-layer comments plus all the replies
let repliesNumber = 0;
for (let i = 0; i < thisChapterCommentsUnsorted.length; i++) {
  repliesNumber += thisChapterCommentsUnsorted[i].Replies.length;
}
const commentsNumber = thisChapterCommentsUnsorted.length + repliesNumber;


     return (
        <>
        <hr></hr>
        <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#public">
            <Nav.Item>
              <Nav.Link href="#public">Public</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#friends">Friends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#groups">Groups</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
        <Form.Control type="text" placeholder="Write a comment..." />
        <hr></hr>
        <div className="mb-3">{commentsNumber} comments</div>
        { thisChapterCommentsSorted.map(FilteredBit => {
          return(
            <>
            <div className="mb-3">
            <Card className="bg-light p-2 d-inline-flex">
          <div>
          <div className="d-flex justify-content-between">
            <strong className="me-5"><a href={FilteredBit.username}>{FilteredBit.username}</a></strong>
            <div className='d-flex align-items-center'><FcLike className="me-2"/><div>{FilteredBit.Likers.length}</div></div>
          </div>
          <div>{FilteredBit.Comment}</div>
          </div>
            </Card>
            <div>
            <span className="me-2">Like</span>
            <span className="me-2">Reply</span>
            <span className="me-2">{FilteredBit.Timestamp}</span>
            </div>
            </div>
        
        { FilteredBit.Replies.sort(function(comment1, comment2) {
    return comment2.Likers.length - comment1.Likers.length;
  }).map(FilteredThing =>
          {return(
          <div className='mb-3 ms-5'>
          <Card className="bg-light p-2 d-inline-flex">
          <div>
          <div className="d-flex justify-content-between">
            <strong className="me-5">{FilteredThing.username}</strong>
            <div className='d-flex align-items-center'><FcLike className="me-2"/><div>{FilteredThing.Likers.length}</div></div>
          </div>
          <div>{FilteredThing.Comment}</div>
          </div>
          </Card> 
          <div>
          <span className="me-2">Like</span>
          <span className="me-2">Reply</span>
          <span className="me-2">{FilteredThing.Timestamp}</span>
          </div>
          </div>
            
          )})}

          </>
          )
        })}
  
        </Card.Body>
      </Card>
      </>
 )}
}
  
export default CommentsSection;