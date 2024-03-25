export async function singleReviewScore(allReviews, placeId, venue) {

    console.log('inside singleReviewScore')
    let reviewForVenue = null

    allReviews.reviews.forEach(review => {
        if (review.venue_rated === placeId) 
        reviewForVenue = review
        return
    })

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