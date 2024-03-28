import React, { useState, useEffect } from "react";
import Avatar from "../../../shared/avatar/Avatar";
import CommentDate from "./comment/CommentDate";
import CommentBody from "./comment/CommentBody";
import { useMain } from "../../../../context/main";
import MoreReviews from "../../../shared/avatar/MoreReviews";

function Comment() {
  const { currentVenueData, review } = useMain();
  const [addReviews, setAddReviews] = useState(false);
  const [seeAllReviews, setSeeAllReviews] = useState(false);

  useEffect(() => {
    if (currentVenueData && currentVenueData.review_count > 1) {
      let count = 0;
      currentVenueData.reviews.forEach((review) => {
        if (review.answers[0].xcom) {
          count += 1;
        }
        if (count > 1) {
          setAddReviews(true);
        } else {
          setAddReviews(false);
        }
      });
    } else {
      setAddReviews(false);
    }
  }, [currentVenueData]);

  function toSeeReviews(data) {
    setSeeAllReviews(data);
  }

  return (
    <>
      {seeAllReviews ? (
        currentVenueData &&
        currentVenueData.reviews &&
        currentVenueData.reviews.length > 0 &&
        currentVenueData.reviews.map((review, index) =>
          review.answers && review.answers[0] && review.answers[0].xcom ? (
            <div
              id={`${index}CommentContainer`}
              key={index}
              className='font-["PT_SERIF"]'
            >
              <div id={`${index}CommentDateWrapper`}>
                <CommentDate date={review.date} />
              </div>
              <div id={`${index}CommentBodyWrapper`}>
                <CommentBody comment={review.answers[0].xcom} />
              </div>
              <div id={`${index}commentAvatarWrapper`}>
                <Avatar
                  align={"justify-end"}
                  display={"flex"}
                  name={"comment"}
                  pic={review.avatar}
                  user={review.user_email}
                  userId={review.user_id}
                  index={index}
                  comment={true}
                  amount={'multiple'}
                  seeAllReviews={seeAllReviews}
                />
              </div>
            </div>
          ) : (
            ""
          )
        )
      ) : currentVenueData &&
        currentVenueData.reviews &&
        currentVenueData.reviews[0] ? (
        <div id={`commentContainer`} className='font-["PT_SERIF"]'>
          <div id={`commentDateWrapper`}>
            <CommentDate date={currentVenueData.reviews[0].date} />
          </div>
          <div id={`commentBodyWrapper`}>
            <CommentBody comment={currentVenueData.reviews[0].answers[0].xcom} />
          </div>
          <div id={`commentAvatarWrapper`}>
            <Avatar
              align={"justify-end"}
              display={"flex"}
              name={"comment"}
              pic={currentVenueData.reviews[0].avatar}
              user={currentVenueData.reviews[0].user_email}
              userId={currentVenueData.reviews[0].user_id}
              index={0}
              comment={true}
              amount={'single'}
              seeAllReviews={seeAllReviews}
            />
          </div>
        </div>
      ) : (
        "t4wxs"
      )}
        <div id='commentActionContainer' className='flex justify-between mt-9'>
        { review && review.answers && review.answers[0] && review.answers[0].xcom ? (
          <div id="storeEditCommentWrapper" className='order-2 underline'>
            <p>Edit your comment</p>
          </div>
        ) : (
          <div id="storeLeaveCommentWrapper" className='order-2 underline'>
            <p>leave a comment</p>
          </div>
        )}

      {addReviews ? (
        <div id="moreReviewsWrapper">
          <MoreReviews toSeeReviews={toSeeReviews} />
        </div>
      ) : (
        ""
      )}
        </div>
    </>
  );
}

export default Comment;
