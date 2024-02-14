export const patchReview = async (reviewId, answers) => {
    console.log(answers)
    console.log(answers[0])
    console.log(answers[1])

    const updateReviewResponse = await fetch(`http://127.0.0.1:5000/api/review-single/${reviewId}`, {
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