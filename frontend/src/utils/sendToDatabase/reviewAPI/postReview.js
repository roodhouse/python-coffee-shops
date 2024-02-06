import { lastVenue } from "../venueAPI/lastVenue"
import { reviewFetch } from "./reviewFetch"

export const postReview = async (venue, image, location, address, hours, rating, answers, user_id, user_email) => {
    // fetch the last venue created
    try {
        try {
            const venueName = await lastVenue()
            if ( !venueName ) {
                throw new Error('Failed to fetch last venue name.')
            }
            venue = venueName
            try {
                const postNewReview = await reviewFetch(venue, answers, user_id, user_email)
                if ( postNewReview ) {
                    return true
                } else {
                    return false
                }
            } catch(error) {
                console.error("Error with postNewReview:", error);
                alert("Error with postNewReview"); 
            }
        } catch (error) {
            console.error("Error getting lastVenue:", error);
            alert("Error getting last venue"); 
        }
    } catch (error) {
        console.error("Error posting review:", error);
        alert("Error posting review");
    }

}