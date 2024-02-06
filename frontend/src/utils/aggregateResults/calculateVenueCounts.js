export function calculateVenueCounts(allReviews) {
    let venueCount = {}
    allReviews.reviews.forEach( review => {
        let venueName = review.venue
        venueCount[venueName] = ( venueCount[venueName] || 0 ) + 1
    })
    return venueCount
}