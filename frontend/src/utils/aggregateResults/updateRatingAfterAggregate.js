export async function updateRatingAfterAggregate(placeId, venueName, rating) { 
    const encodedId = encodeURIComponent(placeId)
    try {
        await fetch(`http://127.0.0.1:5000/api/venues/${encodedId}`, {
            method: 'PUT',
            body: JSON.stringify({
                rating: rating
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('id_token')}`
            }
        })
    } catch (error) {
        console.error("An error occurred in updateRatingAfterAggregate", error)
        alert("An error occurred")
    }
}