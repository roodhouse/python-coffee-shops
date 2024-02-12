import { reviewAPI } from "./sendToDatabase/reviewAPI/ReviewAPI"
import { updateUser } from "./sendToDatabase/userAPI/UserAPI"

export const handleNewReviewExistVenue = async (answers, currentVenue, user_email, user_id, newReviewExistVenue, editReview) => {
    console.log(`handleNewReviewExistVenue: ${answers}`)
    
    const venue = currentVenue
    const newReview = await reviewAPI(editReview, newReviewExistVenue, answers, venue, user_email, user_id)
    if (newReview) {
        const userUpdate = await updateUser(user_id, venue)
        if (userUpdate) {
            return true
        } else {
            console.error('Error in handleNewReviewExistVenue: userUpdate')
        }
    } else {
        console.error('Error in handleNewReviewExistVenue: newReview')
    }
}