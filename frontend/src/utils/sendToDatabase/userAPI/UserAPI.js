export const updateUser = async (user_id, venue, type) => {
    try {
        const getCurrentUserReviews = await fetch(`http://127.0.0.1:5000/api/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('id_token')}`
            }
        })
        if ( getCurrentUserReviews.ok ) {
            const currentUserData = await getCurrentUserReviews.json()
            const currentReviews = Array.isArray(currentUserData.reviews) ? currentUserData.reviews : []
            let updatedReviewIds;
            if (type === 'new') {
                updatedReviewIds = [ ...currentReviews, venue]
            } else if (type === 'full') {   
                updatedReviewIds = currentReviews.filter(item => item !== venue)                
            }
            const updateUserResponse = await fetch(`http://127.0.0.1:5000/api/user/${user_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    venue: updatedReviewIds
                }),
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('id_token')}`
                }
            })
            if (updateUserResponse.ok) {
                return true
            } else {
                return false
            }
        }
    } catch (error) {
        console.error("Error with getCurrentUserReviews:", error);
        alert("Error with getCurrentUserReviews"); 
    }
}