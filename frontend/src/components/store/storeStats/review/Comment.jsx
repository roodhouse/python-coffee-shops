import React, { useState, useEffect } from "react";
import Avatar from "../../../shared/avatar/Avatar";
import CommentDate from "./comment/CommentDate";
import CommentBody from "./comment/CommentBody";
import { useMain } from "../../../../context/main";
import MoreReviews from "../../../shared/avatar/MoreReviews";
import commentObjectCreation from "../../../../utils/miscFunctions/createCommentObject";
import NoCommentTease from "./comment/NoCommentTease";

function Comment() {
  const { currentVenueData, home, userData } = useMain();
  const [ addReviews, setAddReviews ] = useState(false);
  const [ seeAllReviews, setSeeAllReviews ] = useState(false);
  const [ commentObject, setCommentObject ] = useState([])
  const [ currentPlaceStoreId, setCurrentPlaceStoreId ] = useState(null)
  const [ found, setFound ] = useState(undefined)

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
              <div>test for comment with multiple</div>
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
              { found !== undefined ? (
                <div id="withCommentTeaseWrapper">                
                { commentObject[0][0].comment === found.answers.xcom ? (
                  <NoCommentTease count={1} />
                ) : (
                  <NoCommentTease count={2} />
                )}
                </div>
              ) : '' }
            </div>
          
          ) : (
            <div id="noCommentsWrapper">
              <NoCommentTease count={0} />
            </div>
          )
        )}

        {/* #2 create component to be the parent of leave/edit/delete comment & moreReviews below
        then create the leave/edit/delete component and adjust css */}
        <div id="storeCommentActionsWrapper">
          <p>test</p>
        </div>
      
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