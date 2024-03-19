export function calculateVenueCounts(allReviews) {
    let venueCount = {}
    let venueList = []
    allReviews.reviews.forEach( review => {
        let venueId = review.venue_rated
        let venue = review.venue

        if(!venueList.some(v => v.place_id == venueId)) {
            venueList.push({
                place_id: venueId,
                name: venue
            })
        }
        venueCount[venueId] = ( venueCount[venueId] || 0 ) + 1
    })
    return [venueCount, venueList]
}