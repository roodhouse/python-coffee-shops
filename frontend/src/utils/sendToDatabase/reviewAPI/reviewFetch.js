import getCurrentDate from "../../miscFunctions/getDate"

export async function reviewFetch(venue, answers, user_id, user_email) {
    const date = getCurrentDate()
    const reviewResponse = await fetch('http://127.0.0.1:5000/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
            venue_name: venue,
            answers,
            user_email,
            date
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        }
    })
    if ( reviewResponse.ok ) {
        return true
    } else {
        return false
    }
}