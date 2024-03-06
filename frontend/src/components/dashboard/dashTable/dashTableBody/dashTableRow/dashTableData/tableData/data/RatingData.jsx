import React from "react";
import { FaFaceSmile, FaFaceMeh, FaFaceFrown } from "react-icons/fa6";

function RatingData({ review, reviewData, index, heading }) {
  return (
    <>
      <div
        style={{
          color:
            review.answers.sum === 0
              ? "red"
              : review.answers.sum === 1
              ? "#f6D95E"
              : "green",
        }}
        className="flex items-center text-2xl text-left md:text-center md:table-cell"
      >
        <span
          style={{ color: index % 2 === 0 ? "black" : "white" }}
          className="text-black text-base inline-block w-1/3 md:hidden font-bold"
        >
          Rating
        </span>
        {review.answers.sum === 0 ? (
          <FaFaceFrown />
        ) : review.answers.sum === 1 ? (
          <FaFaceMeh />
        ) : (
          <FaFaceSmile />
        )}
      </div>
    </>
  );
}

export default RatingData;
