import React from "react";
import { useDashContext } from "../../../../../../context/dashContext";
import TableData from "./tableData/TableData";

function DashTableData({ review, reviewData, index, heading }) {
  const { clickType } = useDashContext();

  const handleClick = (heading, event) => {
    clickType(heading, reviewData, event, review.review_id);
  };

  return (
    <>
      <td
        onClick={(event) => handleClick(heading, event)}
        className="p-2 text-left md:text-center block md:table-cell"
      >
        {heading !== "Actions" && heading !== "Rating" ? (
          <span className="inline-block w-1/3 md:hidden font-bold">
            {heading}
          </span>
        ) : (
          ""
        )}

        <span className="cursor-pointer hover:text-deepOrange">
          <TableData
            review={review}
            reviewData={reviewData}
            index={index}
            heading={heading}
          />
        </span>
      </td>
    </>
  );
}

export default DashTableData;
