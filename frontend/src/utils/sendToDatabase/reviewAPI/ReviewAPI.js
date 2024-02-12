import { postReview } from "./postReview";
import { updateReview } from "./updateReview";
import { postNewReviewExistVenue } from "./postNewReviewExistVenue";

export const reviewAPI = async (editReview, venue, image, location, address, hours, rating, answers, user_id, user_email, reviewId, newReviewForExistVenue) => {
    // if edit review is false then it is a new review 
    if ( !editReview ) {
       const postResult = await postReview(venue, image, location, address, hours, rating, answers, user_id, user_email)
        if (postResult) {
            return true
        } else {
            console.error('Error in reviewAPI: postResult')
        }
    } else if (newReviewForExistVenue) {
        const postNewReviewExistVenueResult = await postNewReviewExistVenue(venue, answers, user_email, user_id)
        if (postNewReviewExistVenueResult) {
            return true
        } else {
            console.error('Error in reviewAPI: postNewReviewExistVenueResult')
        }
    } else {
        const postUpdate = await updateReview(answers, reviewId)
        if (postUpdate) {
            return true
        } else {
            console.error('Error in reviewAPI: postUpdate')
        }
    }
}