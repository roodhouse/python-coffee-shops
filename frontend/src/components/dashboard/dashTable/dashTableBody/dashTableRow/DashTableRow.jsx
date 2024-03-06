import React from "react";
import { useDashContext } from "../../../../../context/dashContext";
import DashTableData from "./dashTableData/DashTableData";
import getReviewDataByHeading from "../../../../../utils/miscFunctions/getReviewDataByHeading";

function DashTableRow() {
  const {
    venueReviews,
    tableHeadings,
    editResponse,
    handleEditClick,
    handleDelete,
  } = useDashContext();

  return (
    <>
      {venueReviews.map((review, index) => (
        <tr
          key={review.review_id}
          id={review.review_id}
          className={`${
            index % 2 === 0
              ? "bg-almostWhite text-black"
              : "bg-[#4c4c4c] text-white"
          } ${
            index === venueReviews.length - 1 ? "border-b" : "border-b-0"
          } border border-black md:border-none block md:table-row`}
        >
          {tableHeadings.map((heading) => {
            const shouldRenderCall = (() => {
              switch (heading) {
                case "Comment":
                  return !!review.answers?.xcom;
                case "Rating":
                  return !!review.answers?.sum;
                default:
                  return true;
              }
            })();
            return shouldRenderCall ? (
              <DashTableData
                key={heading}
                review={review}
                reviewData={getReviewDataByHeading(
                  review,
                  heading,
                  editResponse,
                  handleEditClick,
                  handleDelete
                )}
                index={index}
                heading={heading}
              />
            ) : null;
          })}
        </tr>
      ))}
    </>
  );
}

export default DashTableRow;
