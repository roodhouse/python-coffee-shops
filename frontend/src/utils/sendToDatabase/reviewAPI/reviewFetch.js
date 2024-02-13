export async function reviewFetch(venue, answers, user_id, user_email) {
    console.log(venue)
    const reviewResponse = await fetch('http://127.0.0.1:5000/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
            venue_name: venue,
            answers,
            user_email
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