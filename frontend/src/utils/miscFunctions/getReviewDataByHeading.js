export default function getReviewDataByHeading(review, heading, editResponse, handleEditClick, handleDelete) {

    switch (heading) {
        case "ID":
            return review.review_id
        case "Venue":
            return review.venue_name
        case "Location":
            return review.venue_location
        case "Comment":
            return review.answers?.xcom || 'N/A'
        case "Rating":
            return review.answers?.sum || 'N/A'
        case "Actions":
            return '';
        default:
            return 'N/A'
    }
}