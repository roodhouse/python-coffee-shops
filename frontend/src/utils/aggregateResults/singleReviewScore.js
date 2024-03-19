export async function singleReviewScore(allReviews, placeId, venue) {
    const reviewForVenue = allReviews.reviews.find(review => review.venue_rated.place_id === placeId)
    if (!reviewForVenue || !reviewForVenue.answers || !reviewForVenue.answers[0]) {
        return []
    }
 
    const aggScore = Object.values(reviewForVenue.answers[0])
        .map(answer => {
            const parsedAnswer = parseFloat(answer)
            return isNaN(parsedAnswer) ? null : parsedAnswer
        })

    return aggScore
}