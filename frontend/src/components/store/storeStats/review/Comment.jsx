import React, { useState, useEffect } from "react";
import Avatar from "../../../shared/avatar/Avatar";
import CommentDate from "./comment/CommentDate";
import CommentBody from "./comment/CommentBody";
import { useMain } from "../../../../context/main";
import MoreReviews from "../../../shared/avatar/MoreReviews";
import commentObjectCreation from "../../../../utils/miscFunctions/createCommentObject";
import NoCommentTease from "./comment/NoCommentTease";

function Comment() {
  const { currentVenueData, home, userData, userAuthenticated, count, changeCount } = useMain();
  const [ addReviews, setAddReviews ] = useState(false);
  const [ seeAllReviews, setSeeAllReviews ] = useState(false);
  const [ commentObject, setCommentObject ] = useState([])
  const [ currentPlaceStoreId, setCurrentPlaceStoreId ] = useState(null)
  const [ found, setFound ] = useState(undefined)
  

  useEffect(() => {
    if (!userAuthenticated) {
      if (commentObject[1] === 1) {
        // not logged in with one comment
        changeCount(1)
      } else if (commentObject[1] > 1) {
        // not logged in and more than one comment
        changeCount(2)
      } else {
        // not logged in with no comments
        changeCount(0)
      }
    } else {
      // user is logged in
      if (commentObject && commentObject[0] && found) {
        if (found.answers.xcom && found.answers.xcom !== '') {
          let foundComment = commentObject[0].find(comment => {
            return comment.comment === found.answers.xcom
          })
          if (foundComment) {
            if (commentObject[1] === 1) {
              changeCount(3)
            } else {
              changeCount(4)
            }
          } else {
            if (commentObject[1] === 1) {
              changeCount(5)
            } else if (commentObject[1] > 1) {
              changeCount(6)
            } else {
              changeCount(0)
            }
          }
        } else {
          if (commentObject[1] === 1) {
            changeCount(7)
          } else if (commentObject[1] > 1) {
            changeCount(8)
          } else {
            changeCount(0)
          }
        }
      } else {
        if (commentObject[1] === 1) {
          changeCount(10)
        } else if (commentObject[1] > 1) {
          changeCount(11)
        } else {
          changeCount(0)
        }
      }
    }
  },[userAuthenticated, commentObject])

  useEffect(() => {
    if (currentVenueData) {
        setCurrentPlaceStoreId(currentVenueData.place_id)
        if (userData) {
          setFound(userData.review_content.find((review) => review.place_id === currentVenueData.place_id))
        }
    }
    
},[currentVenueData, userData])

  useEffect(() => {
    if (home === 'store' && currentVenueData && currentVenueData.reviews) {
      setCommentObject(commentObjectCreation(currentVenueData.reviews))
      let allComments = commentObjectCreation(currentVenueData.reviews)
      let sortedComments;
      // sort the comments based on if userData is the same
      if (userData) {
        sortedComments = [...allComments[0]].sort((a,b) => {
          if (a.userEmail === userData.email) {
            return -1
          } else if (b.userEmail === userData.email) {
            return 1
          } else {
            return 0
          }
        })
        console.log(sortedComments)
      console.log(allComments[0])
      // replace allComments[0] with the new sorted comments
      allComments[0] = sortedComments
      console.log(allComments[0])
      setCommentObject(allComments)
      } else {
        setCommentObject(allComments)
      }
      
      
      
    }
  },[currentVenueData, home])

  useEffect(() => {
    if (commentObject[1] > 1) {
      setAddReviews(true)
    } else {
      setAddReviews(false)
    }
  },[commentObject])

  function toSeeReviews(data) {
    setSeeAllReviews(data);
  }

  return (
    <>
      
        {seeAllReviews ? (
          commentObject &&
          commentObject[0] &&
          commentObject[0].map((comment, index) => (
            comment !== '' ? (
              <div
              id={`${index}CommentContainer`}
              key={index}
              className='font-["PT_SERIF"]'
            >
              <div id={`${index}CommentDateWrapper`}>
                <CommentDate date={comment.date} />
              </div>
              <div id={`${index}CommentBodyWrapper`}>
                <CommentBody comment={comment.comment} />
              </div>
              <div id={`${index}commentAvatarWrapper`}>
                <Avatar
                  align={"justify-end"}
                  display={"flex"}
                  name={"comment"}
                  pic={comment.avatar}
                  user={comment.userEmail}
                  userId={comment.userId}
                  index={index}
                  comment={true}
                  amount={'multiple'}
                  seeAllReviews={seeAllReviews}
                />
              </div>
            </div>
            ) : ''
          ))
        ) : (
          // return just the first review comment
          commentObject && commentObject[0] && commentObject[0][0] ? (
          <div
              id={`commentContainer`}
              className='font-["PT_SERIF"]'
            >
              <div id={`commentDateWrapper`}>
                <CommentDate date={commentObject[0][0].date} />
              </div>
              <div id={`commentBodyWrapper`}>
                <CommentBody comment={commentObject[0][0].comment} />
              </div>
              <div id={`commentAvatarWrapper`}>
                <Avatar
                  align={"justify-end"}
                  display={"flex"}
                  name={"comment"}
                  pic={commentObject[0][0].avatar}
                  user={commentObject[0][0].userEmail}
                  userId={commentObject[0][0].userId}
                  index={0}
                  comment={true}
                  amount={'multiple'}
                  seeAllReviews={seeAllReviews}
                />
              </div>
 
            </div>
          
          ) : '' )}

            <div id="commentStoreActionsWrapper">
              <div id="commentsTeaseWrapper">
                <NoCommentTease count={count} addReviews={addReviews} toSeeReviews={toSeeReviews} />
              </div>
            </div>
            
              
      
    </>
  );
}

export default Comment;