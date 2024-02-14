import { updateReview } from "./reviewAPI/updateReview";
import { patchReview } from "./reviewAPI/patchReview";

export const handleReviewUpdate = async (answers, reviewId, category) => {
    if (category === 'full') {
        const updateResponse = await updateReview(reviewId, answers)
        if (updateResponse) {
            return true
        } else {
            console.error('Error in handleReviewUpdate: updateReview')
        }
    } else {
        const updateResponse = await patchReview(reviewId, answers)
        if (updateResponse) {
            return true
        } else {
            console.error('Error in handleReviewUpdate: patchReview')
        }
    }
}