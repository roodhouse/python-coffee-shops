import { postVenue } from "./venueAPI/VenueAPI"
import { reviewAPI } from "./reviewAPI/ReviewAPI"
import { updateUser } from "./userAPI/UserAPI"

export const handleNewSubmission = async (user_id, user_email, venue, image, location, address, hours, rating, answers, editReview, reviewId, newReviewExistVenue) => {
    let newVenue;
    if (newReviewExistVenue) {
        newVenue = true
    } else {
        newVenue = await postVenue(venue, image, location, address, hours, rating)
    }
    
    if (newVenue) {
        console.log(`handleNewSubmission: ${venue}`)
        const newReview = await reviewAPI(editReview, venue, image, location, address, hours, rating, answers, user_id, user_email, reviewId, newReviewExistVenue)
        if (newReview) {
            const userUpdate = await updateUser(user_id, venue)
            if (userUpdate) {
                return true
            } else {
                console.error('Error in handleNewSubmission: userUpdate')
            }
        } else {
            console.error('Error in handleNewSubmission: newReview')
        }
    } else {
        console.error('Error in handleNewSubmission: postVenue()')
    }
}