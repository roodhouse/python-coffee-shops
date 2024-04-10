import { postVenue } from "./venueAPI/VenueAPI"
import { reviewAPI } from "./reviewAPI/ReviewAPI"
import { updateUser } from "./userAPI/UserAPI"

export const handleNewSubmission = async (user_id, user_email, venue, image, location, address, city, state, map, website, placeId, hours, rating, answers, editReview, reviewId, newReviewExistVenue, simpleRate) => {
    console.log('at the top of handleNewSubmission')
    let newVenue;
    if (newReviewExistVenue || simpleRate) {
        newVenue = true
    } else {
        newVenue = await postVenue(venue, image, location, address, city, state, map, website, placeId, hours, rating)
    }
    
    if (newVenue) {
        const newReview = await reviewAPI(editReview, venue, image, location, address, placeId, hours, rating, answers, user_id, user_email, reviewId, newReviewExistVenue, simpleRate)
        if (newReview) {
            const type = 'new'
            const userUpdate = await updateUser(user_id, venue, placeId, type)
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