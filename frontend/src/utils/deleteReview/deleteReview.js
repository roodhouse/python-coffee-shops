export async function deleteReview(reviewId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('id_token')}`
            }
        })
        if (!response.ok) {
            throw new Error('Error deleting review')
        }
        alert('Review deleted')
        return true
    } catch (error) {
        console.error(error.message)
    }
}