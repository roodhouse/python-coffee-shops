export default function findUserReview(userData, currentVenueData) {
    if ( userData && currentVenueData && currentVenueData.reviews) {
        return currentVenueData.reviews.find(review => review.user_email === userData.email)
    }
    return null
}