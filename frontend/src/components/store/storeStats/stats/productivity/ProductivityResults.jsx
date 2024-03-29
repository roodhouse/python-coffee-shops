import React from "react";
import Item from "../statsShared/Item";
import { useMain } from "../../../../../context/main";

function ProductivityResults({ current, page, data, reviewId }) {
  const { currentVenueAgg } = useMain();

  let p1,
    p2,
    p3,
    p4,
    p5,
    p6 = 0;

  if (page === "dashPage") {
    let productivityArray = Object.entries(data)
      .slice(2, 8)
      .map((item) => item[1]);
    productivityArray.forEach((answer, index) => {
      if (answer === null) {
        productivityArray[index] = null;
      } else if (answer === 0) {
        productivityArray[index] = 25;
      } else if (answer === 1) {
        productivityArray[index] = 75;
      } else {
        productivityArray[index] = 100;
      }
    });

    p1 = productivityArray[0];
    p2 = productivityArray[1];
    p3 = productivityArray[2];
    p4 = productivityArray[3];
    p5 = productivityArray[4];
    p6 = productivityArray[5];
  } else {
    if (currentVenueAgg) {
      p1 = currentVenueAgg.p1 === null ? null : (currentVenueAgg.p1 / 2) * 100;
      p2 = currentVenueAgg.p2 === null ? null : (currentVenueAgg.p2 / 2) * 100;
      p3 = currentVenueAgg.p3 === null ? null : (currentVenueAgg.p3 / 2) * 100;
      p4 = currentVenueAgg.p4 === null ? null : (currentVenueAgg.p4 / 2) * 100;
      p5 = currentVenueAgg.p5 === null ? null : (currentVenueAgg.p5 / 2) * 100;
      p6 = currentVenueAgg.p6 === null ? null : (currentVenueAgg.p6 / 2) * 100;
    }
  }

  return (
    <>
      <div
        id={`productivityResultsContainer-${page}`}
        className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'
      >
        <div id={`productivityWiFiWrapper-${page}`} className="w-[45%]">
          <Item
            page={page}
            type={p1 === null ? "unknown" : "wifi"}
            current={current ? current[0] : ""}
            name={"Stable Wi-Fi"}
            rating={
              p1 === null
                ? "#ddd"
                : p1 <= 25
                ? "red"
                : p1 >= 26 && p1 <= 50
                ? "#E0531F"
                : p1 >= 51 && p1 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              p1 <= 25
                ? "20%"
                : p1 >= 26 && p1 <= 50
                ? "45%"
                : p1 >= 51 && p1 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`productivityPowerWrapper-${page}`} className="w-[45%]">
          <Item
            page={page}
            type={p2 === null ? "unknown" : "power"}
            current={current ? current[1] : ""}
            name={"Power Sockets"}
            rating={
              p2 === null
                ? "#ddd"
                : p2 <= 25
                ? "red"
                : p2 >= 26 && p2 <= 50
                ? "#E0531F"
                : p2 >= 51 && p2 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              p2 <= 25
                ? "20%"
                : p2 >= 26 && p2 <= 50
                ? "45%"
                : p2 >= 51 && p2 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`productivityStayWrapper-${page}`} className="w-[45%]">
          <Item
            page={page}
            type={p3 === null ? "unknown" : "stay"}
            current={current ? current[2] : ""}
            name={"Long Stays"}
            rating={
              p3 === null
                ? "#ddd"
                : p3 <= 25
                ? "red"
                : p3 >= 26 && p3 <= 50
                ? "#E0531F"
                : p3 >= 51 && p3 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              p3 <= 25
                ? "20%"
                : p3 >= 26 && p3 <= 50
                ? "45%"
                : p3 >= 51 && p3 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`productivityTablesWrapper-${page}`} className="w-[45%]">
          <Item
            page={page}
            type={p4 === null ? "unknown" : "tables"}
            current={current ? current[3] : ""}
            name={"Large tables"}
            rating={
              p4 === null
                ? "#ddd"
                : p4 <= 25
                ? "red"
                : p4 >= 26 && p4 <= 50
                ? "#E0531F"
                : p4 >= 51 && p4 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              p4 <= 25
                ? "20%"
                : p4 >= 26 && p4 <= 50
                ? "45%"
                : p4 >= 51 && p4 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`productivityQuietWrapper-${page}`} className="w-[45%]">
          <Item
            page={page}
            type={p5 === null ? "unknown" : "quiet"}
            current={current ? current[4] : ""}
            name={"Quiet"}
            rating={
              p5 === null
                ? "#ddd"
                : p5 <= 25
                ? "red"
                : p5 >= 26 && p5 <= 50
                ? "#E0531F"
                : p5 >= 51 && p5 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              p5 <= 25
                ? "20%"
                : p5 >= 26 && p5 <= 50
                ? "45%"
                : p5 >= 51 && p5 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`productivityCallsWrapper-${page}`} className="w-[45%]">
          <Item
            page={page}
            type={p6 === null ? "unknown" : "calls"}
            current={current ? current[5] : ""}
            name={"Audio/Video Calls"}
            rating={
              p6 === null
                ? "#ddd"
                : p6 <= 25
                ? "red"
                : p6 >= 26 && p6 <= 50
                ? "#E0531F"
                : p6 >= 51 && p6 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              p6 <= 25
                ? "20%"
                : p6 >= 26 && p6 <= 50
                ? "45%"
                : p6 >= 51 && p6 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
      </div>
    </>
  );
}

export default ProductivityResults;
