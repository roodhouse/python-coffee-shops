export async function fetchAllReviews(){
    const response = await fetch('http://127.0.0.1:5000/api/reviews', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    return response.ok ? await response.json() : null
}