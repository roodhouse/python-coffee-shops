import { updateReview } from "./reviewAPI/updateReview";

export const handleReviewUpdate = async (answers, reviewId, category) => {
        const updateResponse = await updateReview(reviewId, answers)
        if (updateResponse) {
            return true
        } else {
            console.error('Error in handleReviewUpdate: updateReview')
        }
}