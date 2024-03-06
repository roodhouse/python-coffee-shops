import React from "react";
import { useDashContext } from "../../../context/dashContext";
import DashTableHead from "./dashTableHead/DashTableHead";
import DashTableBody from "./dashTableBody/DashTableBody";

function DashVenueTable() {
  const { venueReviews } = useDashContext();

  return (
    <>
      <div id="dashVenueTableContainer">
        {venueReviews ? (
          <div id="ordersTableContainer">
            <table className="min-w-full border-collapse block md:table">
              <DashTableHead />
              <DashTableBody />
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DashVenueTable;
