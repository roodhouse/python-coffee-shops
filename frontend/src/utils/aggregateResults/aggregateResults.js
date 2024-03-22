import { calculateVenueCounts } from "./calculateVenueCounts"
import { fetchAllReviews } from "./fetchAllReviews"
import { aggregateScoresForVenue } from "./aggregateScoresForVenue"
import { singleReviewScore } from "./singleReviewScore"
import { updateAggregateAndVenueRating } from "./updateAggregateAndVenueRating"

export async function aggregateResults() { 
    let allReviews = await fetchAllReviews()
    let venueCount = calculateVenueCounts(allReviews)
    let allUpdatesSuccessful = true

    let venueObj = venueCount[0]

    for (let[placeId, count] of Object.entries(venueObj)) {
        let venue = venueCount[1].find(v => v.place_id === placeId)
        let aggScore = count > 1 ? await aggregateScoresForVenue(allReviews, placeId, venue) : await singleReviewScore(allReviews, placeId, venue)
        let aggUpdateSuccess = await updateAggregateAndVenueRating(placeId, venue, aggScore)
        if (!aggUpdateSuccess) {
            allUpdatesSuccessful = false
            console.error('Error in aggregateResults for venue', venue)
        }
    }
    return allUpdatesSuccessful
}