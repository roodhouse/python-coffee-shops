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
  

  console.log(found)
  console.log(commentObject)
  console.log(commentObject[1])
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
      // issue below..... .
      // user is logged in
      // if (commentObject && commentObject[0] && commentObject[0][0] && found) {
      //   // issue here because the needed comment will not always be at commentObject[0][0].comment --- issue here!!
      //   if (commentObject[0][0].comment === found.answers.xcom) {
      //     console.log('found answers?')
      //     // a comment belongs to the users
      //     if (commentObject[1] === 1) {
      //       // the only comment is the users
      //       changeCount(3)
      //     } else if (commentObject[1] > 1) {
      //       // one of many comments is users
      //       changeCount(4)
      //     }
      //   } 
      // } else {

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
    }
},[currentVenueData])

useEffect(() => {
    if (userData) {
        setFound(userData.review_content.find((review) => review.place_id === currentPlaceStoreId ))
    }
},[currentPlaceStoreId, userData, found])

  useEffect(() => {
    if (home === 'store' && currentVenueData && currentVenueData.reviews) {
      setCommentObject(commentObjectCreation(currentVenueData.reviews))
      console.log('object creation useEffect')
    }
  },[currentVenueData, home])

  useEffect(() => {
    console.log(commentObject[1])
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