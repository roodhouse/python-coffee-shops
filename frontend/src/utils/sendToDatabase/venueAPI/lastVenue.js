export async function lastVenue() {

    const lastVenueCreated = await fetch("http://127.0.0.1:5000/api/venues/last", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if ( lastVenueCreated.ok ) {
        const venueData = await lastVenueCreated.json()
        const venueName = venueData.venues[0].venueName
        return venueName
    } else {
        console.error("Error fetching the last venue from the server", lastVenueCreated.statusText)
        alert("Error fetching last venue from server")
        return null
    }
}