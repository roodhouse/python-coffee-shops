import React, { useState } from "react";
import { useMain } from "../../../../../context/main";
import StoreNewComment from "./storeNewComment/StoreNewComment";
import MoreReviews from "../../../../shared/avatar/MoreReviews";

function NoCommentTease({ count, addReviews, toSeeReviews }) {
  const [addComment, setAddComment] = useState(false);
  const [kids, setKids] = useState();

  const { userAuthenticated, currentVenue, setPage, home, setHistory } = useMain();

  let hideOriginal;

  let toggleComponents = () => {
    setAddComment(false);
    if (count === 1) {
      kids.forEach((kid) => {
        kid.classList.remove("hidden");
      });
    }
    setKids();
    if (count === 2) {
      let commentTeaseStyle = document.getElementById(
        "withCommentTeaseWrapper"
      );
      commentTeaseStyle.classList.remove("mt-[2.25rem]");
    }
  };

  const handleClick = (count, event) => {
    if (!userAuthenticated) {
      setPage("join");
      setHistory([home, currentVenue])
    } else {
      setAddComment(true);
      if (count === 1) {
        let parentContainer = event.currentTarget.parentElement.parentElement;
        hideOriginal = Array.from(parentContainer.children).slice(0, 3);
        setKids(hideOriginal);
        hideOriginal.forEach((child) => {
          child.classList.add("hidden");
        });
      } else if (count === 2) {
        let commentTeaseStyle = document.getElementById(
          "withCommentTeaseWrapper"
        );
        commentTeaseStyle.classList.add("mt-[2.25rem]");
      }
    }
  };

  return (
    <>
      {addComment ? (
        <StoreNewComment toggleComponents={toggleComponents} mt={true} formTrigger={true} />
      ) : count === 0 ? (
        <div
          id={`noCommentContainer-${count}`}
          className="underline cursor-pointer"
          onClick={(event) => handleClick(count, event)}
        >
          <p>Leave a comment about {currentVenue}</p>
        </div>
      ) : count === 1 ? (
        // user is not logged in and there is a comment
        <div
          id={`noCommentContainer-${count}`}
          className="underline cursor-pointer"
          onClick={(event) => handleClick(count, event)}
        >
          <p>Leave a comment.</p>
        </div>
      ) : count === 2 ? (
        // user not logged in and more than one comment or user logged in and none of the comments to user
        <div id="commentActionContainer" className="flex mt-9 justify-between">
          <div
            id={`noCommentContainer-${count}`}
            onClick={(event) => handleClick(count, event)}
            className="cursor-pointer underline text-right"
          >
            <p>Leave a comment</p>
          </div>
          {addReviews ? (
            <div id="moreReviewsWrapper" className="order-[-1]">
              <MoreReviews toSeeReviews={toSeeReviews} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : count === 3 ? (
        // user is logged in and the only comment is theirs
        <div
          id="storeEditCommentContainer"
          onClick={(event) => handleClick(count, event)}
          className="cursor-pointer underline text-right mt-9"
        >
          <p>Edit your comment</p>
        </div>
      ) : count === 4 ? (
        // user logged in and is owner of one of the many comments @ count 4
        // works but.. see notes in todo.txt
        <div id="commentActionContainer" className="flex mt-9 justify-between">
          <div
            id={`noCommentContainer-${count}`}
            onClick={(event) => handleClick(count, event)}
            className="cursor-pointer underline text-right"
          >
            <p>Edit your comment</p>
          </div>
          {addReviews ? (
            <div id="moreReviewsWrapper" className="order-[-1]">
              <MoreReviews toSeeReviews={toSeeReviews} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : count === 5 ? (
        // user logged in, single comment that is not users
        <div
          id={`noCommentContainer-${count}`}
          className="underline cursor-pointer"
          onClick={(event) => handleClick(count, event)}
        >
          <p>Leave a comment.</p>
        </div>
      ) : count === 6 ? (
        // user logged in and none of the comments are the users
        <div id="commentActionContainer" className="flex mt-9 justify-between">
          <div
            id={`noCommentContainer-${count}`}
            onClick={(event) => handleClick(count, event)}
            className="cursor-pointer underline text-right"
          >
            <p>Leave a comment</p>
          </div>
          {addReviews ? (
            <div id="moreReviewsWrapper" className="order-[-1]">
              <MoreReviews toSeeReviews={toSeeReviews} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : count === 7 ? (
        // user logged in, one comment, he has not left a review or comment
        <div
          id={`noCommentContainer-${count}`}
          className="underline cursor-pointer"
          onClick={(event) => handleClick(count, event)}
        >
          <p>Leave a comment.</p>
        </div>
      ) : count === 8 ? (
        // user logged in, many comments, he has not left a review or comment
        <div id="commentActionContainer" className="flex mt-9 justify-between">
          <div
            id={`noCommentContainer-${count}`}
            onClick={(event) => handleClick(count, event)}
            className="cursor-pointer underline text-right"
          >
            <p>Leave a comment</p>
          </div>
          {addReviews ? (
            <div id="moreReviewsWrapper" className="order-[-1]">
              <MoreReviews toSeeReviews={toSeeReviews} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : count === 10 ? (
        //user is logged in and there is a single comment not by the user
        <div
          id={`noCommentContainer-${count}`}
          className="underline cursor-pointer"
          onClick={(event) => handleClick(count, event)}
        >
          <p>Leave a comment.</p>
        </div>
      ) : count === 11 ? (
        // user logged in and more than one comment and none are user comments
        <div id="commentActionContainer" className="flex mt-9 justify-between">
          <div
            id={`noCommentContainer-${count}`}
            onClick={(event) => handleClick(count, event)}
            className="cursor-pointer underline text-right"
          >
            <p>Leave a comment</p>
          </div>
          {addReviews ? (
            <div id="moreReviewsWrapper" className="order-[-1]">
              <MoreReviews toSeeReviews={toSeeReviews} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : '' }
    </>
  );
}

export default NoCommentTease;
