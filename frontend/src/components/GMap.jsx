import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useMain } from '../context/main';

const googleAPI = process.env.REACT_APP_GOOGLE_API_KEY;

function GMap() {
  const { home } = useMain();
  const [mapInstance, setMapInstance] = useState(null);

  const mapOptions = {
    center: {
      lat: 30.627946853637695,
      lng: -97.85050201416016
    },
    zoom: 14
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleAPI,
      version: 'weekly'
    });

    loader.load()
      .then((google) => {
        const instance = new google.maps.Map(document.getElementById('map'), mapOptions);
        setMapInstance(instance);

        // create markers
        const locations = [
          {
            lat: 30.627946853637695,
            lng: -97.85050201416016
          }
        ]

        const markers = locations.map(location => new google.maps.Marker({
          position: location,
          map: instance // associate the marker with the map
        }))

        // create marker cluster
        new MarkerClusterer({ map: instance, markers })
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  let markers = [mapOptions.center]

  useEffect(() => {
    if (home === 'map') {
      console.log(mapInstance);
      console.log(markers)
    }
  }, [home, mapInstance]); // Re-run the effect when `home` or `mapInstance` changes

  return (
    <div id="mapContainer" className="h-full">
      <div id="map" className="h-full"></div>
    </div>
  );
}

export default GMap;
