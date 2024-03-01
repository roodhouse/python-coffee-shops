export const postVenue = async (venue, image, location, address, city, map, website, hours, rating) => {
    console.log(hours)

    // hours = [
    //     {
    //         'Sun': [{'open': '5am','close': '8pm'}],
    //         'Mon': [{'open' : '5am','close' : '8pm'}],
    //         'Tues': [{'open' : '5am','close' : '8pm'}],
    //         'Wed': [{'open' : '5am','close' : '8pm'}],
    //         'Thurs': [{'open' : '5am','close' : '8pm'}],
    //         'Fri': [{'open' : '5am','close' : '8pm'}],
    //         'Sat': [{'open' : '5am','close' : '8pm'}],
    //     }
    // ]

    // location = [
    //     {
    //         fake: 'location'
    //     }
    // ]

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
                map,
                website,
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