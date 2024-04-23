export default function sortVenues(venues, currentFilter) {
    console.log(currentFilter)
    if (venues) {
        let newVenuesObject = []
        let venuesArray = Object.entries(venues)
        venuesArray[0][1].forEach((venue) => {
            newVenuesObject.push(
                {
                    'id': venue.id,
                    'place_id': venue.place_id,
                    'name': venue.name,
                    'image': venue.image,
                    'rating': venue.rating,
                    'hours': venue.hours,
                    'address': venue.address,
                    'aggregates': venue.aggregates
                }
            )
    })

    if (currentFilter.length <= 1) {
        // sort array based on rating
            newVenuesObject.sort((venueA, venueB) => {
                let sortResult;
                if (currentFilter && currentFilter[0]) {
                    const filterVenueA = venueA.aggregates[currentFilter[0]] || 0
                    const filterVenueB = venueB.aggregates[currentFilter[0]] || 0
                    sortResult = filterVenueB - filterVenueA
                }
                return sortResult
            })
    } else {
        console.log('more than 1')
        // here!
        // more than one filter is being used
        // total the values for the filters of the venues
        // sort newVeunesObject by values 
    }
    
        return newVenuesObject
    }
}