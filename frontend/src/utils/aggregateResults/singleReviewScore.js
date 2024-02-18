export async function singleReviewScore(allReviews, venue) {
    const reviewForVenue = allReviews.reviews.find(review => review.venue === venue)
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