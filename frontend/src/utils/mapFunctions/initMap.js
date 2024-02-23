import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const googleAPI = process.env.REACT_APP_GOOGLE_API_KEY;

export async function initMap() {
    console.log('map called')
    
  const loader = new Loader({
    apiKey: googleAPI,
    version: "weekly",
  });

  let map;
  let markers;
  // Load the required libraries
  await loader.load().then(async(google) => {
    await google.maps.importLibrary('marker')
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: 30.627946853637695, lng: -97.85050201416016 },
      mapId: "remote_friendly",
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const pinGlyph = new google.maps.marker.PinElement({
        glyph: label,
        glyphColor: "white",
      });
      
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: pinGlyph.element,
      });
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.setContent(position.lat + ", " + position.lng);
        infoWindow.open(map, marker);
      });
      return marker;
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            map.setCenter(pos)
        })
    }
  });

  // Add a marker clusterer to manage the markers.
  new MarkerClusterer({ markers, map });
}

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
