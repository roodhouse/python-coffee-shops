export default function sortVenues(venues, currentFilter) {
    if (venues) {
        console.log(venues)
        let newVenuesObject = []
        let venuesArray = Object.entries(venues)
        venuesArray[0][1].forEach((venue) => {
            // need to push more info onto the object -- here!
            newVenuesObject.push([venue.name, venue.aggregates])
    })
    
    // sort array based on accessibility rating
        newVenuesObject.sort((venueA, venueB) => {
            let sortResult;
            if (currentFilter && currentFilter[0]) {
                const accessibilityA = venueA[1][currentFilter[0]] || 0
                const accessibilityB = venueB[1][currentFilter[0]] || 0
                sortResult = accessibilityB - accessibilityA
            }
            return sortResult
        })
    
        return newVenuesObject
    }
}