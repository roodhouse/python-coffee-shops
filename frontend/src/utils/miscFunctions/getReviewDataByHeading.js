export default function getReviewDataByHeading(review, heading) {
    switch (heading) {
        case "ID":
            return review.review_id
        case "Venue":
            return review.venue
        case "Location":
            return review.location
        case "Comment":
            return review.answers?.xcom || 'N/A'
        case "Rating":
            return review.answers?.sum || 'N/A'
        case "Actions":
            return <div></div>
        default:
            return 'N/A'
    }
}