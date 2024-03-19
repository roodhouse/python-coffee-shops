export const postVenue = async (venue, image, location, address, city, state, map, website, placeId, hours, rating) => {
    console.log('website is:', website)
    try {
        // create venue
        const venueResponse = await fetch('http://127.0.0.1:5000/api/venues/', {
            method: 'POST',
            body: JSON.stringify({
                venue,
                image,
                location,
                address,
                city,
                state,
                map,
                website,
                placeId,
                hours,
                rating
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('id_token')}`
            }
        })

        if ( !venueResponse.ok ) {
            console.error("Error creating the venue", venueResponse.statusText)
            alert("error creating venue")
            return
        } else {
            return true
        }
    } catch(error) {
        console.error("An error occurred in VenueAPI", error)
        alert("An unexpected error occurred")
    }
}