import React, { useState } from "react";
import { Button, Card, Form, Nav } from "react-bootstrap";
import app from "../../Firebase";
import { getFirestore, addDoc, increment, arrayUnion, arrayRemove, updateDoc, collection, doc, setDoc, Timestamp, Firestore, serverTimestamp, query, where, getDocs, getDoc, orderBy, limit, DocumentSnapshot } from 'firebase/firestore'; 
import { useCollectionData, useDocument, useDocumentData } from 'react-firebase-hooks/firestore'
import { AiFillHeart } from 'react-icons/ai'
import { getAuth } from "firebase/auth";


function CommentsSection(props) {

// INITIALIZE FIREBASE STUFF
const db = getFirestore(app);
const auth = getAuth(app);
const currentUser = getAuth(app).currentUser;
const signedIn = localStorage.getItem("signedIn")
const userUID = localStorage.getItem("userUID")

// GET CURRENT USER
const [currentUserValue] = useDocument(userUID &&
    doc(db, 'users', userUID),
    {snapshotListenOptions: { includeMetadataChanges: true },}
);

const currentUserDisplayName = currentUserValue && currentUserValue.data().displayName
const currentUserFriends = currentUserValue && currentUserValue.data().friends
const currentUserGroups = currentUserValue && currentUserValue.data().groups.joined



// Reply Button
function ReplyButton(props) {
    return(
        <>
        <div className="likeReplyButton"><span className="ms-2 likeReplyButton" onClick={props.handleClick}>Reply</span></div>
        </>
    )
}

function CommentButtons(props) {
const [showReplyInput, setShowReplyInput] = React.useState(false)
const handleClick = () => setShowReplyInput(true)
    return(
        <>
        <div className="d-flex inline align-items-center mb-2 ms-2">
                <LikeButton commentUID={props.commentUID} />
                <ReplyButton handleClick={handleClick} commentUID={props.commentUID}/>
                <CommentTime time={props.time}/>
        </div>
        {showReplyInput ? <ReplyInput commentUID={props.commentUID}/> : <></>}
        </>
    )
}


// Reply Input
function ReplyInput(props) {
const [showReplyInput, setShowReplyInput] = React.useState(true)
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowReplyInput(false);
        const replyDisplayName = currentUserDisplayName
        const replyText = event.target.reply.value;
        const timestamp = Date.now()
        const replyUID = replyDisplayName+timestamp 
        const replyingTo = props.commentUID
        setDoc(doc(db, "comments", replyUID), {
            commentUID: replyUID,
            displayName: replyDisplayName,
            timestamp: timestamp,
            comment: replyText,
            commentType: "reply",
            replyingTo: replyingTo,
            likes: 0,
            likers: []
        });
        event.target.reply.value = ""
    }
return(
    <>
    {showReplyInput ? 
    <>
    <div className="ms-5">
        <Form onSubmit={handleSubmit}>
            <Form.Control as="textarea" rows="2" maxLength={2000} className="mb-1" required={true} name="reply" type="text" placeholder="Type your reply..."/> 
            <Button variant="primary" size="sm" type="submit">
            Post Reply
            </Button>
        </Form> 
    </div>
    </>
    : <></>}
    </>
)
}

// Like Button
function LikeButton(props) {
const [comment] = useDocument(doc(db, 'comments', props.commentUID));
const userDisplayName = currentUserDisplayName;
const userAlreadyLiked = comment && comment.data().likers.includes(userDisplayName);
const addLike = () => {
updateDoc(doc(db, "comments", props.commentUID), {likers: arrayUnion(userDisplayName)})
updateDoc(doc(db, "comments", props.commentUID), {likes: increment(1)})
}
const removeLike = () => {
updateDoc(doc(db, "comments", props.commentUID), {likers: arrayRemove(userDisplayName)})
updateDoc(doc(db, "comments", props.commentUID), {likes: increment(-1)})
}
const handleClick = () => userAlreadyLiked ? removeLike() : addLike()
return <div className="likeReplyButton"><span onClick={handleClick}>{userAlreadyLiked ? "Unlike" : "Like"}</span></div>
}

// Display number of likes
function LikesNumber(props) {
    const [comment] = useDocument(doc(db, 'comments', props.commentUID));
    const likesCount = comment && comment.data().likes
return(
   likesCount===0 ?
   <></>
   : likesCount===1 ?
   <div className="d-flex align-items-center" style={{fontSize: "12px"}}>1<AiFillHeart className="ms-1" color="red"/></div>
   : likesCount > 1 ?
   <div className="d-flex align-items-center" style={{fontSize: "12px"}}>{likesCount}<AiFillHeart className="ms-1" color="red"/></div>
   : <></>
)
}

// Display when comment was posted
function CommentTime(props) {
    // Timestap in firestore comment 
    const fsTime = props.time;
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
return(
<div className="ms-4" style={{fontSize: "12px"}}>
{minutes < 1 ? "Just now" : 
minutes > 0 & hours < 1 ? minutes + " m" :
hours > 0 & days < 1 ? hours + " h" :
days > 0 & weeks < 1 ? days + " d" :
weeks > 0 & years < 1 ? weeks + " w" :
year > 0 ? years + " y"
: null}
</div>
)
}

// Display posted comments for this page
function CommentsForThisPage() {
const db = getFirestore(app);
const commentsRef = collection(db, "comments")
const q = query(commentsRef, orderBy("likes", "desc"));
const [comments] = useCollectionData(q, {idField: 'id'});
const friendComments = comments && currentUserFriends && comments.filter(bit => bit.commentType==="original").filter(bit => currentUserFriends.some(thing => thing.uid===bit.userUID))
const [commentSelection, setCommentSelection] = useState(comments);

const handleCommentSelection = (eventKey) => {
setCommentSelection(eventKey)
} 

// commentSelection was coming up undefined on initial page load, hence this.
if(commentSelection===undefined && comments) {
    handleCommentSelection(comments)
}

return(
    <>
    <h2>Comments</h2>
    <Nav className="my-3" variant="tabs" defaultActiveKey={"public"} defaultChecked={"public"}>
      <Nav.Item>
        <Nav.Link eventKey="public" onClick={() => handleCommentSelection(comments)}>Public</Nav.Link>
      </Nav.Item>
      {signedIn && <Nav.Item>
        <Nav.Link eventKey="friends" onClick={() => handleCommentSelection(friendComments)}>Following</Nav.Link>
      </Nav.Item> }
    </Nav>
    {comments && commentSelection && commentSelection.filter(comment => comment.commentType==="original" & comment.commentSection===props.section).map(comment => {
        return(
            <>
            <div className="mb-1">
            <div className="mb-1">
            <Card className="p-2" style={{display: "inline-block", backgroundColor: "rgb(245,245,245)", borderColor: "white"}}>
            <div className="d-flex inline justify-content-between">
                <strong>{comment.displayName}</strong>
                <LikesNumber commentUID={comment.commentUID}/>
            </div>
            <div className="pe-5">{comment.comment}</div>
            </Card>
            <div>
            </div>
            <CommentButtons commentUID={comment.commentUID} time={comment.timestamp}/>
            </div>
            {comments.filter(reply => reply.commentType==="reply" & reply.replyingTo===comment.commentUID).map(reply => {
                return(
                    <>
                    <div className="ms-5 mb-1">
                    <div>
                    <Card className="p-2" style={{display: "inline-block", backgroundColor: "rgb(245,245,245)", borderColor: "white"}}>
                    <div className="d-flex inline justify-content-between">
                        <strong>{reply.displayName}</strong>
                        <LikesNumber commentUID={reply.commentUID}/>
                    </div>
                    <div className="pe-5">{reply.comment}</div>
                    </Card>
                    </div>
                    <div>
                    </div>
                    <div className="d-flex inline align-items-center ms-2">
                    <LikeButton commentUID={reply.commentUID} />
                    <CommentTime time={reply.timestamp}/>
                    </div>
                    </div>
                    </>
                )
            })}
            </div>
            </>
        )
    })}
    </>
)
}

function PostAComment() {
// Handle when a user submits an original comment.
const handleSubmit = (event) => {
    event.preventDefault();
    const thisSection = props.section;
    const commentDisplayName = currentUserDisplayName;
    const commentText = event.target.comment.value;
    const timestamp = Date.now()
    const commentUID = commentDisplayName+timestamp 
    setDoc(doc(db, "comments", commentUID), {
        commentSection: thisSection,
        commentUID: commentUID,
        displayName: commentDisplayName,
        userUID: userUID,
        timestamp: timestamp,
        comment: commentText,
        commentType: "original",
        likes: 0,
        likers: []
    });
    event.target.comment.value = ""
}

return(
    signedIn && 
<div>
        <Form onSubmit={handleSubmit}>
                <Form.Control as="textarea" rows="3" className="mb-2" maxLength={2000} required={true} name="comment" type="text" placeholder="Write a comment..."/>
              <Button variant="primary" type="submit">
               Post Comment
              </Button>
        </Form> 
</div>
)}


// FINAL RETURN
    return(
        <>
        <div>
        <PostAComment />
        <hr></hr>
        <CommentsForThisPage />
        </div>
        </>
    )
}

export default CommentsSection;