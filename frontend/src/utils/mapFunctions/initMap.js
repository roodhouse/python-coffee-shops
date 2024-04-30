import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import isOpen from "../miscFunctions/openOrClosed";

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
            
            const locations = []
            const venuesArray = Object.entries(venues)
    
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
                        'map': venue.map,
                        'aggregates': venue.aggregates,
                        'lat': venue.location[0].lat,
                        'lng': venue.location[0].lng
                    }
                )
            })

            const markers = locations.map((position, i) => {
                position.address = position.address.split(',')[0]
                const label = labels[i % labels.length];
                const pinGlyph = new google.maps.marker.PinElement({
                    glyph: label,
                    glyphColor: "white",
                });

                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position,
                    content: pinGlyph.element,
                });

                // set up icons
                let ratingIcon;
                if (position.rating === 2) {
                    ratingIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='text-[green]'><path style='fill: currentColor' d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' /></svg>"
                } else if (position.rating >= 1 && position.rating < 2) {
                    ratingIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='text-[#F6D95E]'><path style='fill: currentColor' d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z' /></svg>"
                } else if (position.rating > 1) {
                    ratingIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='text-[red]'><path style='fill: currentColor' d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20C145.2 326.1 196.3 288 256 288s110.8 38.1 127.3 91.3c2.6 8.4-2.1 17.4-10.5 20s-17.4-2.1-20-10.5C340.5 349.4 302.1 320 256 320s-84.5 29.4-96.7 68.7zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' /></svg>"
                }
                else {
                    ratingIcon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='text-[#ddd]'><path style='fill: currentColor' d='M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z' /></svg>"
                }

                // setup hours
                let openClosed = isOpen(position.hours[0])

                marker.addListener("click", () => {                    
                    infoWindow.setContent(`
                                        <div id='${position.id}-markerContentContainer' class='w-[218px] h-[185px] font-["Noto_Sans"]'>
                                            <div id='${position.id}-markerHeaderContainer' class='flex justify-between items-center mb-2'>
                                                <div id='${position.id}-markerHeading' class='text-xl font-bold'>
                                                    <h1>${position.name}</h1>
                                                </div>
                                                <div id='${position.id}-markerRating' class='w-8 h-8'>
                                                    ${ratingIcon}
                                                </div>
                                            </div>  
                                            <div id='${position.id}-markerImage' class='w-full h-[40%] mb-2'>
                                                <img src='${position.image}' alt='${position.name}' class='w-full h-full object-cover' />
                                            </div>
                                            <div id='${position.id}-markerAddress' class='mb-2'>
                                                <a href='${position.map}' target="_blank" class='underline text-blue'>${position.address}</a>
                                            </div>
                                            <div id='${position.id}-markerHours'>
                                                <p class='${openClosed === 'open' ? 'text-green' : 'text-red'} font-bold'>${position.name} is currently <span>${openClosed}!</span></p>
                                            </div>
                                        </div>`);
                    infoWindow.open(mapLarge, marker);
                    google.maps.event.addListener(infoWindow, 'domready', () => {
                        const headerContainer = document.getElementById(`${position.id}-markerHeaderContainer`)
                        const imageContainer = document.getElementById(`${position.id}-markerImage`)
                            if (headerContainer) {
                            headerContainer.addEventListener("click", () => {
                                onSubmitCallback(position.name)
                            })
                        } else {
                            console.log('headerContainer not here')
                        }
                        if (imageContainer) {
                            imageContainer.addEventListener("click", () => {
                                onSubmitCallback(position.place_id, position.name)
                            })
                        } else {
                            console.log('imageContainer not here')
                        }
                    })
                    
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
