export default function sortVenues(venues, currentFilter) {
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
        let scores = {}
        newVenuesObject.forEach((venue) => {
            let total = 0
            for (const filter of Object.values(currentFilter)) {
                if (venue.aggregates && venue.aggregates[filter]) {
                    total += venue.aggregates[filter]
                }
                scores[venue.name] = total
            }
        })

        newVenuesObject.sort((venueA, venueB) => {
            const scoreA = scores[venueA.name] || 0
            const scoreB = scores[venueB.name] || 0

            if (scoreA < scoreB) {
                return 1
            }

            if (scoreA > scoreB) {
                return -1
            }

            return 0
        })
    }
        return newVenuesObject
    }
}