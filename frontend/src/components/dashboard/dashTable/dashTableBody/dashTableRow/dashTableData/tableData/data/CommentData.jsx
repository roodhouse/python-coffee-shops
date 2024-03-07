import React from "react";
import { useDashContext } from "../../../../../../../../context/dashContext";

function CommentData({ review, reviewData, index, heading }) {
  const { currentComment, handleSubmitCommentClick, handleDelete } =
    useDashContext();
  return currentComment !== null ? (
    <>
      <div id="commentContainer">
        <textarea
          name={`${review.review_id}-editComment`}
          id={`${review.review_id}-editComment`}
          cols="10"
          rows="5"
          maxLength={100}
          className="w-full mb-8 bg-[#f5f5f5] rounded p-3"
          defaultValue={review.answers.xcom}
        ></textarea>
      </div>
      <div id="actionContainer" className="flex justify-center">
        <button
          onClick={() => handleSubmitCommentClick(review.review_id)}
          id={`${review.review_id}_edit`}
          className="text-white font-bold py-1 px-2 rounded border border-blue bg-blue hover:bg-black hover:border-black hover:text-white mr-2"
        >
          Submit
        </button>
        <button
          id={`${review.review_id}_delete`}
          onClick={() => handleDelete('comment', review)}
          className="text-white font-bold py-1 px-2 rounded border border-red bg-red hover:bg-black hover:border-black hover:text-white"
        >
          Delete
        </button>
      </div>
    </>
  ) : (
    review.answers.xcom
  );
}

export default CommentData;
