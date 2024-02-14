export const postNewReviewExistVenue = async (venue, answers, user_email, user_id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            venue_name: venue,
            answers: answers
        }),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('id_token')}`
        }
    })
    if (response.ok) {
        return true
    } else {
        console.error('Error in postNewReviewExistVenue')
    }
}