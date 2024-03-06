import React from "react";
import DashTableRow from "./dashTableRow/DashTableRow";

function DashTableBody() {
  return (
    <>
      <tbody className="block md:table-row-group">
        <DashTableRow />
      </tbody>
    </>
  );
}

export default DashTableBody;
