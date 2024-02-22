import { calculateVenueCounts } from "./calculateVenueCounts"
import { fetchAllReviews } from "./fetchAllReviews"
import { aggregateScoresForVenue } from "./aggregateScoresForVenue"
import { singleReviewScore } from "./singleReviewScore"
import { updateAggregateAndVenueRating } from "./updateAggregateAndVenueRating"

export async function aggregateResults() {
    let allReviews = await fetchAllReviews()
    let venueCount = calculateVenueCounts(allReviews)


    console.log('allReviews from aggregateResults: ', allReviews)

    let allUpdatesSuccessful = true

    for (let[venue, count] of Object.entries(venueCount)) {
        let aggScore = count > 1 ? await aggregateScoresForVenue(allReviews, venue) : await singleReviewScore(allReviews, venue)
        let aggUpdateSuccess = await updateAggregateAndVenueRating(venue, aggScore)
        if (!aggUpdateSuccess) {
            allUpdatesSuccessful = false
            console.error('Error in aggregateResults for venue', venue)
        }
    }
    return allUpdatesSuccessful
}