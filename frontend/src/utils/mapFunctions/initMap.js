import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const googleAPI = process.env.REACT_APP_GOOGLE_API_KEY;

export function initMap(longitude, latitude) {
    console.log('map called');
    
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
                fields: ['address_components', 'formatted_address', 'geometry', 'name', 'opening_hours', 'url', 'website', 'photos']
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
            });

            const infoWindow = new google.maps.InfoWindow({
                content: "",
                disableAutoPan: true,
            });

            const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            const locations = [
                {
                    lat: 30.627946853637695,
                    lng: -97.85050201416016,
                },
                {
                    lat: 30.647946853637695,
                    lng: -97.85050201416016,
                },
            ];

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
                    infoWindow.setContent(position.lat + ", " + position.lng);
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
