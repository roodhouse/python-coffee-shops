export const updateReview = async (reviewId, answers) => {
    const updateReviewResponse = await fetch(`http://127.0.0.1:5000/api/reviews/${reviewId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            answers: answers
        }),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('id_token')}`
        }
    })
    if (updateReviewResponse.ok) {
        return true
    } else {
        console.error('Error in updateReview')
    }
}