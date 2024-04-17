export default function sortVenues(venues, currentFilter) {
    if (venues) {
        let newVenuesObject = []
        let venuesArray = Object.entries(venues)
        venuesArray[0][1].forEach((venue) => {
            newVenuesObject.push([venue.name, venue.aggregates])
    })
    
    // sort array based on accessibility rating
        newVenuesObject.sort((venueA, venueB) => {
            let sortResult;
            // const accessibilityA = venueA[1]?.Accessible || 0
            // const accessibilityB = venueB[1]?.Accessible || 0
            // return accessibilityB - accessibilityA
            
            
            if (currentFilter && currentFilter[0]) {
                // here !
                console.log(venueA[1])
                console.log(currentFilter[0])
                console.log(currentFilter)
                console.log(venueA[1].Sockets)
                console.log(venueA[1].currentFilter[0])
                console.log(venueA[1].currentFilter)
                const accessibilityA = venueA[1]?.currentFilter[0] || 0
                const accessibilityB = venueB[1]?.currentFilter[0] || 0
                sortResult = accessibilityB - accessibilityA
            }
            return sortResult
        })
    
        console.log(newVenuesObject)
    }
}
// todo
// need to include all attributes, not just accessibility 
// need to use this instead of venues in Places.jsx