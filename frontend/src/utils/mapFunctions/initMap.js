import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const googleAPI = process.env.REACT_APP_GOOGLE_API_KEY;

export function initMap(longitude, latitude, venues, onSubmitCallback) {
    console.log('map called', venues);
    
    return new Promise((resolve, reject) => {
        const loader = new Loader({
            apiKey: googleAPI,
            version: "weekly",
            libraries: ['places']
        });

        loader.load().then(async (google) => {
            await google.maps.importLibrary('marker');
            
            const mapSmall = new google.maps.Map(document.getElementById("map-small"), {
                zoom: 14,
                center: { lat: latitude, lng: longitude },
                mapId: "remote_friendly_small",
            });

            const mapLarge = new google.maps.Map(document.getElementById("map-large"), {
                zoom: 8,
                center: { lat: latitude, lng: longitude },
                mapId: "remote_friendly_large",
            });

            const options = 
            {
                fields: ['address_components', 'formatted_address', 'geometry', 'name', 'opening_hours', 'url', 'website', 'photos', 'place_id']
            }

            const autoComplete = new google.maps.places.Autocomplete(
                document.getElementById('venueInput'), options);
                

            autoComplete.bindTo("bounds", mapSmall);

            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace();
                if (!place.geometry) {
                    console.error("No place data available for input: '" + place.name + "'");
                    reject(new Error("No place data available")); 
                    return;
                }
                resolve(place);
                if (onSubmitCallback) {
                    onSubmitCallback()
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: "",
                disableAutoPan: true,
            });

            const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            // todo, all the coordinates from the data as the locations...
            
            const locations = []
            const venuesArray = Object.entries(venues)
            console.log(venuesArray)
            venuesArray[0][1].forEach((venue) => {
                locations.push(
                    {
                        'id': venue.id,
                        'place_id': venue.place_id,
                        'name': venue.name,
                        'image': venue.image,
                        'rating': venue.rating,
                        'hours': venue.hours,
                        'address': venue.address,
                        'aggregates': venue.aggregates,
                        'lat': venue.location[0].lat,
                        'lng': venue.location[0].lng
                    }
                )
            })

            console.log(locations)
            const markers = locations.map((position, i) => {
                const label = labels[i % labels.length];
                const pinGlyph = new google.maps.marker.PinElement({
                    glyph: label,
                    glyphColor: "white",
                });

                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position,
                    content: pinGlyph.element,
                });

                marker.addListener("click", () => {
                    // todo: add location info here
                    infoWindow.setContent(`
                                        <div id='${position.id}-markerContentContainer' class='w-[218px] h-[218px]'>
                                            <div id='${position.id}-markerHeading' class='text-xl'>
                                                <h1>${position.name}</h1>
                                            </div>
                                            <div id='${position.id}-markerImage' class='w-full h-[40%]'>
                                                <img src='${position.image}' alt='${position.name}' class='w-full h-full object-cover' />
                                            </div>
                                        </div>`);
                    infoWindow.open(mapLarge, marker);
                });
                return marker;
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    mapLarge.setCenter(pos);
                });
            }

            new MarkerClusterer({ markers, map: mapLarge });
        }).catch(error => {
            console.error("Error loading Google Maps API:", error);
            reject(error);
        });
    });
}
