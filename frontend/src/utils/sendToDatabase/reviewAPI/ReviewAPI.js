import { postReview } from "./postReview";
import { updateReview } from "./updateReview";

export const reviewAPI = async (editReview, venue, image, location, address, hours, rating, answers, user_id, user_email, reviewId, newReviewExistVenue) => {
    // if edit review is false then it is a new review 
    if ( !editReview || newReviewExistVenue ) {
       const postResult = await postReview(venue, image, location, address, hours, rating, answers, user_id, user_email, newReviewExistVenue)
        if (postResult) {
            return true
        } else {
            return false
        }
    } else {
        const postUpdate = await updateReview(answers, reviewId)
        if (postUpdate) {
            return true
        } else {
            return false
        }
    }
}