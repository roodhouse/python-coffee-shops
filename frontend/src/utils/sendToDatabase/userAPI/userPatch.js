export const userPatch = async (userId, color) => {
    const userPatchResponse = await fetch(`http://127.0.0.1:5000/api/user/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar : color
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (userPatchResponse.ok) {
        return true
    } else {
        console.error('Error in userPatch')
    }
}