import React from "react";
import Item from "../statsShared/Item";
import { useMain } from "../../../../../context/main";

function SpaceResults({ current, page, data, reviewId }) {
  const { currentVenueAgg } = useMain();

  let sp1,
    sp2,
    sp3,
    sp4,
    sp5,
    sp6,
    sp7,
    sp8,
    sp9 = 0;

  if (page === "dashPage") {
    let spaceArray = Object.entries(data)
      .slice(13, 22)
      .map((item) => item[1]);
    spaceArray.forEach((answer, index) => {
      if (answer === null) {
        spaceArray[index] = null;
      } else if (answer === 0) {
        spaceArray[index] = 25;
      } else if (answer === 1) {
        spaceArray[index] = 75;
      } else {
        spaceArray[index] = 100;
      }
    });

    sp1 = spaceArray[0];
    sp2 = spaceArray[1];
    sp3 = spaceArray[2];
    sp4 = spaceArray[3];
    sp5 = spaceArray[4];
    sp6 = spaceArray[5];
    sp7 = spaceArray[6];
    sp8 = spaceArray[7];
    sp9 = spaceArray[8];
  } else {
    if (currentVenueAgg) {
      sp1 =
        currentVenueAgg.sp1 === null ? null : (currentVenueAgg.sp1 / 2) * 100;
      sp2 =
        currentVenueAgg.sp2 === null ? null : (currentVenueAgg.sp2 / 2) * 100;
      sp3 =
        currentVenueAgg.sp3 === null ? null : (currentVenueAgg.sp3 / 2) * 100;
      sp4 =
        currentVenueAgg.sp4 === null ? null : (currentVenueAgg.sp4 / 2) * 100;
      sp5 =
        currentVenueAgg.sp5 === null ? null : (currentVenueAgg.sp5 / 2) * 100;
      sp6 =
        currentVenueAgg.sp6 === null ? null : (currentVenueAgg.sp6 / 2) * 100;
      sp7 =
        currentVenueAgg.sp7 === null ? null : (currentVenueAgg.sp7 / 2) * 100;
      sp8 =
        currentVenueAgg.sp8 === null ? null : (currentVenueAgg.sp8 / 2) * 100;
      sp9 =
        currentVenueAgg.sp9 === null ? null : (currentVenueAgg.sp9 / 2) * 100;
    }
  }

  return (
    <>
      <div
        id={`spaceResultsContainer-${page}`}
        className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'
      >
        <div id={`spaceLightWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp1 === null ? "unknown" : "light"}
            current={current ? current[0] : ""}
            name={"Natural Light"}
            rating={
              sp1 === null
                ? "#ddd"
                : sp1 <= 25
                ? "red"
                : sp1 >= 26 && sp1 <= 50
                ? "#E0531F"
                : sp1 >= 51 && sp1 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp1 <= 25
                ? "20%"
                : sp1 >= 26 && sp1 <= 50
                ? "45%"
                : sp1 >= 51 && sp1 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceOutdoorWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp2 === null ? "unknown" : "outdoor"}
            current={current ? current[1] : ""}
            name={"Outdoor area"}
            rating={
              sp2 === null
                ? "#ddd"
                : sp2 <= 25
                ? "red"
                : sp2 >= 26 && sp2 <= 50
                ? "#E0531F"
                : sp2 >= 51 && sp2 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp2 <= 25
                ? "20%"
                : sp2 >= 26 && sp2 <= 50
                ? "45%"
                : sp2 >= 51 && sp2 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceSpaciousWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp3 === null ? "unknown" : "spacious"}
            current={current ? current[2] : ""}
            name={"Spacious"}
            rating={
              sp3 === null
                ? "#ddd"
                : sp3 <= 25
                ? "red"
                : sp3 >= 26 && sp3 <= 50
                ? "#E0531F"
                : sp3 >= 51 && sp3 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp3 <= 25
                ? "20%"
                : sp3 >= 26 && sp3 <= 50
                ? "45%"
                : sp3 >= 51 && sp3 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceRestRoomWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp4 === null ? "unknown" : "restroom"}
            current={current ? current[3] : ""}
            name={"Restroom"}
            rating={
              sp4 === null
                ? "#ddd"
                : sp4 <= 25
                ? "red"
                : sp4 >= 26 && sp4 <= 50
                ? "#E0531F"
                : sp4 >= 51 && sp4 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp4 <= 25
                ? "20%"
                : sp4 >= 26 && sp4 <= 50
                ? "45%"
                : sp4 >= 51 && sp4 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceAccessibleWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp5 === null ? "unknown" : "accessible"}
            current={current ? current[4] : ""}
            name={"Accessible"}
            rating={
              sp5 === null
                ? "#ddd"
                : sp5 <= 25
                ? "red"
                : sp5 >= 26 && sp5 <= 50
                ? "#E0531F"
                : sp5 >= 51 && sp5 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp5 <= 25
                ? "20%"
                : sp5 >= 26 && sp5 <= 50
                ? "45%"
                : sp5 >= 51 && sp5 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceAirWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp6 === null ? "unknown" : "air"}
            current={current ? current[5] : ""}
            name={"Air conditioned"}
            rating={
              sp6 === null
                ? "#ddd"
                : sp6 <= 25
                ? "red"
                : sp6 >= 26 && sp6 <= 50
                ? "#E0531F"
                : sp6 >= 51 && sp6 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp6 <= 25
                ? "20%"
                : sp6 >= 26 && sp6 <= 50
                ? "45%"
                : sp6 >= 51 && sp6 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceSmokeWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp7 === null ? "unknown" : "smoke"}
            current={current ? current[6] : ""}
            name={"Smoke Free"}
            rating={
              sp7 === null
                ? "#ddd"
                : sp7 <= 25
                ? "red"
                : sp7 >= 26 && sp7 <= 50
                ? "#E0531F"
                : sp7 >= 51 && sp7 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp7 <= 25
                ? "20%"
                : sp7 >= 26 && sp7 <= 50
                ? "45%"
                : sp7 >= 51 && sp7 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spacePetWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={sp8 === null ? "unknown" : "pet"}
            current={current ? current[7] : ""}
            name={"Pet Friendly"}
            rating={
              sp8 === null
                ? "#ddd"
                : sp8 <= 25
                ? "red"
                : sp8 >= 26 && sp8 <= 50
                ? "#E0531F"
                : sp8 >= 51 && sp8 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp8 <= 25
                ? "20%"
                : sp8 >= 26 && sp8 <= 50
                ? "45%"
                : sp8 >= 51 && sp8 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`spaceParkingWrapper-${page}`} className="w-full">
          <Item
            page={page}
            type={sp9 === null ? "unknown" : "parking"}
            current={current ? current[8] : ""}
            name={"Parking"}
            rating={
              sp9 === null
                ? "#ddd"
                : sp9 <= 25
                ? "red"
                : sp9 >= 26 && sp9 <= 50
                ? "#E0531F"
                : sp9 >= 51 && sp9 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              sp9 <= 25
                ? "10%"
                : sp9 >= 26 && sp9 <= 50
                ? "22.5%"
                : sp9 >= 51 && sp9 <= 75
                ? "35%"
                : "47.5%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
      </div>
    </>
  );
}

export default SpaceResults;
