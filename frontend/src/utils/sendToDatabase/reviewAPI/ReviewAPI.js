import { postReview } from "./postReview";
import { updateReview } from "./updateReview";

export const reviewAPI = async (editReview, venue, image, location, address, hours, rating, answers, user_id, user_email, reviewId) => {
    // if edit review is false then it is a new review 
    if ( !editReview ) {
       const postResult = await postReview(venue, image, location, address, hours, rating, answers, user_id, user_email)
        if (postResult) {
            return true
        } else {
            return false
        }
    } else {
        updateReview(answers, reviewId)
    }
}