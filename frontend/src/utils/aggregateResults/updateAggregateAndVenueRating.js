import { updateRatingAfterAggregate } from "./updateRatingAfterAggregate";

export async function updateAggregateAndVenueRating(venue, aggScore) {
  let rating = aggScore[22]
  console.log(aggScore[0])
  try {
    let response = await fetch("http://127.0.0.1:5000/api/aggregate", {
      method: "POST",
      body: JSON.stringify({
        name: venue,
        c1: aggScore[0],
        c2: aggScore[1],
        p1: aggScore[2],
        p2: aggScore[3],
        p3: aggScore[4],
        p4: aggScore[5],
        p5: aggScore[6],
        p6: aggScore[7],
        ser1: aggScore[8],
        ser2: aggScore[9],
        ser3: aggScore[10],
        ser4: aggScore[11],
        ser5: aggScore[12],
        sp1: aggScore[13],
        sp2: aggScore[14],
        sp3: aggScore[15],
        sp4: aggScore[16],
        sp5: aggScore[17],
        sp6: aggScore[18],
        sp7: aggScore[19],
        sp8: aggScore[20],
        sp9: aggScore[21],
        sum: aggScore[22],
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await updateRatingAfterAggregate(venue, rating)
      return true
    } else {
      console.error("An error occurred in updateAggregateAndVenueRating")
    }
  } catch (error) {
    console.error(
      "An unexpected error occurred in updateAggregateAndVenueRating",
      error
    );
    alert("An error occurred in updateAggregateAndVenueRating");
  }
}
