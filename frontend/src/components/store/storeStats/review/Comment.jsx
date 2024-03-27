import React, { useState, useEffect } from "react";
import { useMain } from "../../../../context/main";
import MoreReviews from "../../../shared/avatar/MoreReviews";
import WithComments from "./comment/WithComments";
import WithoutComments from "./comment/WithoutComments";

function Comment() {
  const { currentVenueData } = useMain();
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

            <div id="withCommentsWrapper">
                <WithComments review={review} index={index} seeAllReviews={seeAllReviews} />
            </div>
            
            
          ) : (
            ''
          )
        )
      ) : (
        <div id="withoutCommentsWrapper">
          <WithoutComments />
        </div>
      )}
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
