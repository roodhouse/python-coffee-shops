import React from "react";

function DashTableHead() {
  const tableHeadings = [
    "ID",
    "Venue",
    "Location",
    "Comment",
    "Rating",
    "Actions",
  ];
  return (
    <>
      <thead className="block md:table-header-group">
        <tr className="border border-deepOrange md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
          {tableHeadings.map((heading, index) => (
            <th
              key={index}
              className="bg-black p-2 md:text-center text-white font-bold md:border-deepOrange text-left block md:table-cell"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default DashTableHead;
