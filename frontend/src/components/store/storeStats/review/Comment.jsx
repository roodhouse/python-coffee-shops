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
      console.log('user is in ')
      // issue below..... .
      // user is logged in
      if (commentObject && commentObject[0] && found) {
        console.log('found: ', found)
        console.log(commentObject)
        console.log(commentObject[1])
        if (found.answers.xcom && found.answers.xcom !== '') {
          console.log('time to compare the comment')
          let foundComment = commentObject[0].find(comment => {
            return comment.comment === found.answers.xcom
          })
          if (foundComment) {
            console.log('found the comment: ', foundComment)
            if (commentObject[1] === 1) {
              console.log('only one comment and it is by the logged in user')
              changeCount(3)
            } else {
              console.log('there are many comments here.')
              changeCount(4)
            }
          } else {
            console.log('no comment was found from user therefore different UI needed')
            if (commentObject[1] === 1) {
              console.log('only a single comment but not our signed in users')
              changeCount(5)
            } else if (commentObject[1] > 1) {
              console.log('many comments and none are our signed in users')
              changeCount(6)
            } else {
              changeCount(0)
            }
          }
        } else {
          console.log('this guy has a review for this venue but does not have a comment for the venue')
          if (commentObject[1] === 1) {
            // here, leaving a quick review leaves a comment value in xcom
            console.log('only one comment for the reviewed venue by our user who did not leave a comment')
            changeCount(7)
          } else if (commentObject[1] > 1) {
            console.log('there are many comments here.')
            changeCount(8)
          } else {
            changeCount(0)
          }
        }
        
        // issue here because the needed comment will not always be at commentObject[0][0].comment --- issue here!!
        // if (commentObject[0][0].comment === found.answers.xcom) {
        //   console.log('found answers?')
        //   // a comment belongs to the users
        //   if (commentObject[1] === 1) {
        //     // the only comment is the users
        //     changeCount(3)
        //   } else if (commentObject[1] > 1) {
        //     // one of many comments is users
        //     changeCount(4)
        //   }
        // } 
      } else {
        console.log('this guy does not have a review for this venue and no comment')
        if (commentObject[1] === 1) {
          console.log('only one comment for the reviewed venue by that our user has not reviewed and does not have a comment')
          changeCount(10)
        } else if (commentObject[1] > 1) {
          // here ! 
          console.log('there are many comments here at the venue our user has not left a review or comment for.')
          changeCount(2)
        } else {
          changeCount(0)
        }
      }
      // else {

      //   // no comment belongs to the user
      //   if (commentObject[1] === 1) {
      //     // only single comment
      //     changeCount(5)
      //   } else if (commentObject[1] > 1) {
      //     // more than one comment
      //     changeCount(6)
      //   } else if (commentObject[1] < 1) {
      //     console.log('go')
      //     changeCount(0)
      //   }
      // }
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

// useEffect(() => {
//     if (userData) {
//         setFound(userData.review_content.find((review) => review.place_id === currentPlaceStoreId ))
//     }
// },[currentPlaceStoreId, userData])

  useEffect(() => {
    if (home === 'store' && currentVenueData && currentVenueData.reviews) {
      setCommentObject(commentObjectCreation(currentVenueData.reviews))
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