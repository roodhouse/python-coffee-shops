import React, { useEffect } from "react";
import { initMap } from "../utils/mapFunctions/initMap";
import { useMain } from "../context/main";
import { useAddForm } from "../context/addFormContext";

function GMap({longitude, latitude, type}) {
  const { home, venues, setVenue } = useMain();
  const { step } = useAddForm()

  const handleMarkerClick = (placeId, venue) => {
    setVenue(placeId, venue)
  }

  useEffect(() => {
    if ((home === "map" && type === 'large') || (home === 'suggest' && type === 'small' && step === 'map')) {
      initMap(longitude, latitude, venues, handleMarkerClick);
    }
  }, [home, type, step]);


  return (
    <div id={`mapContainer-${type}`} className={ type === 'large' ? 'h-full' : 'h-52'}>
      <div id={`map-${type}`} className="h-full"></div>
    </div>
  );
}

export default GMap;
