import React, { useState, useEffect } from "react";
import Avatar from "../../../shared/avatar/Avatar";
import CommentDate from "./comment/CommentDate";
import CommentBody from "./comment/CommentBody";
import { useMain } from "../../../../context/main";
import MoreReviews from "../../../shared/avatar/MoreReviews";
import commentObjectCreation from "../../../../utils/miscFunctions/createCommentObject";
import NoCommentTease from "./comment/NoCommentTease";

function Comment() {
  const { currentVenueData, home } = useMain();
  const [addReviews, setAddReviews] = useState(false);
  const [seeAllReviews, setSeeAllReviews] = useState(false);
  const [ commentObject, setCommentObject ] = useState([])

  useEffect(() => {
    if (home === 'store' && currentVenueData && currentVenueData.reviews) {
      setCommentObject(commentObjectCreation(currentVenueData.reviews))
    }
  },[currentVenueData, home])

  useEffect(() => {
    console.log(commentObject[1])
    if (commentObject[1] > 1) {
      setAddReviews(true)
      console.log('in useEffect')
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
          
          ) : (
            <div id="noCommentsWrapper">
              {/* #1 create component here that will invite to click to add comment
              if user logged in then the textarea appears 
              if user is not logged in then it takes to the login page */}
              <NoCommentTease />
            </div>
          )
        )}

        {/* #2 create component to be the parent of leave/edit/delete comment & moreReviews below
        then create the leave/edit/delete component and adjust css */}
      
      {addReviews ? (
        <div id="moreReviewsWrapper">
          <MoreReviews toSeeReviews={toSeeReviews} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Comment;