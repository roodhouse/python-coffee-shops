import React from "react";
import { useDashContext } from "../../../../../../../../context/dashContext";
import Divider from "../../../../../../../shared/divider/Divider";
import Stats from "../../../../../../../store/storeStats/Stats";

function ActionData({ review, reviewData, index, heading }) {
  const { editResponse, currentAnswers, handleEditClick, handleDelete } =
    useDashContext();
  return (
    <>
      {heading === "Actions" && editResponse === review.review_id && (
        <>
          <div id={`dashStatsDivider-${index}`}>
            <Divider />
          </div>
          <div id={`dashStatsWrapper-${index}`}>
            <Stats
              page={"dashPage"}
              data={currentAnswers}
              reviewId={editResponse}
            />
          </div>
        </>
      )}

      {heading === "Actions" ? (
        <div
          id="actionWrapper"
          className={
            editResponse === review.review_id
              ? `mb-9 flex items-center w-full`
              : `flex items-center w-full`
          }
        >
          <span className="inline-block w-1/3 md:hidden font-bold">
            Actions
          </span>
          <div id="actionContainer" className="flex justify-center">
            <button
              onClick={() => handleEditClick(review.review_id)}
              id={`${review.review_id}_edit`}
              className="text-white font-bold py-1 px-2 rounded border border-blue bg-blue hover:bg-black hover:border-black hover:text-white mr-2"
            >
              {editResponse === review.review_id ? "Done" : "Edit"}
            </button>
            <button
              id={`${review.review_id}_delete`}
              onClick={handleDelete}
              className="text-white font-bold py-1 px-2 rounded border border-red bg-red hover:bg-black hover:border-black hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        reviewData
      )}
    </>
  );
}

export default ActionData;
