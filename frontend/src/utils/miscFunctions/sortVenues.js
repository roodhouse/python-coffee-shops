export default function sortVenues(venues) {
    if (venues) {

        let newVenuesObject = []
        let venuesArray = Object.entries(venues)
        venuesArray[0][1].forEach((venue) => {
            newVenuesObject.push([venue.name, venue.aggregates])
    })
    
    // sort array based on accessibility rating
        newVenuesObject.sort((venueA, venueB) => {
            const accessibilityA = venueA[1]?.Accessible || 0
            const accessibilityB = venueB[1]?.Accessible || 0
            return accessibilityB - accessibilityA
        })
    
        console.log(newVenuesObject)
    }
}
// todo
// need to include all attributes, not just accessibility 
// need to use this instead of venues in Places.jsx