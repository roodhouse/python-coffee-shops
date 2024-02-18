import React from "react";
import Avatar from "../../../shared/avatar/Avatar";
import CommentDate from "./comment/CommentDate";
import CommentBody from "./comment/CommentBody";
import { useMain } from "../../../../context/main";

function Comment() {
  const { currentVenueData } = useMain();

  return (
    <>
      {currentVenueData &&
        currentVenueData.reviews &&
        currentVenueData.reviews.length > 0 &&
        currentVenueData.reviews.map((review, index) =>
          review.answers && review.answers[0] && review.answers[0].xcom ? (
            <div id={`${index}CommentContainer`} key={index} className='font-["PT_SERIF"]'>
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
                />
              </div>
            </div>
          ) : (
            ""
          )
        )}
    </>
  );
}

export default Comment;
