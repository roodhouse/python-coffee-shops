import React from "react";
import Item from "../statsShared/Item";
import { useMain } from "../../../../../context/main";

function CommunityResults({ current, page, data, reviewId }) {
  const { currentVenueAgg } = useMain();

  let c1,
    c2 = 0;

  if (page === "dashPage") {
    let communityArray = Object.entries(data)
      .slice(0, 2)
      .map((item) => item[1]);
    communityArray.forEach((answer, index) => {
      if (answer === null) {
        communityArray[index] = null;
      } else if (answer === 0) {
        communityArray[index] = 25;
      } else if (answer === 1) {
        communityArray[index] = 75;
      } else {
        communityArray[index] = 100;
      }
    });

    c1 = communityArray[0];
    c2 = communityArray[1];
  } else {
    if (currentVenueAgg) {
      c1 = currentVenueAgg.c1 === null ? null : (currentVenueAgg.c1 / 2) * 100;
      c2 = currentVenueAgg.c2 === null ? null : (currentVenueAgg.c2 / 2) * 100;
    }
  }

  return (
    <>
      <div
        id={`communityResultsContainer-${page}`}
        className='flex flex-wrap justify-around items-center font-["PT_SERIF"]'
      >
        <div id={`communityPeopleWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={c1 === null ? "unknown" : "people"}
            current={current ? current[0] : ""}
            name={"People Working"}
            rating={
              c1 === null
                ? "#ddd"
                : c1 <= 25
                ? "red"
                : c1 >= 26 && c1 <= 50
                ? "#E0531F"
                : c1 >= 51 && c1 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              c1 <= 25
                ? "20%"
                : c1 >= 26 && c1 <= 50
                ? "45%"
                : c1 >= 51 && c1 <= 75
                ? "70%"
                : "95%"
            }
            data={data}
            reviewId={reviewId}
          />
        </div>
        <div id={`communityGroupsWrapper-${page}`} className="w-[50%]">
          <Item
            page={page}
            type={c2 === null ? "unknown" : "groups"}
            current={current ? current[1] : ""}
            name={"Group tables"}
            rating={
              c2 === null
                ? "#ddd"
                : c2 <= 25
                ? "red"
                : c2 >= 26 && c2 <= 50
                ? "#E0531F"
                : c2 >= 51 && c2 <= 75
                ? "#F6D95E"
                : "green"
            }
            width={
              c2 <= 25
                ? "20%"
                : c2 >= 26 && c2 <= 50
                ? "45%"
                : c2 >= 51 && c2 <= 75
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

export default CommunityResults;
