import React, { useEffect } from "react";
import { initMap } from "../utils/mapFunctions/initMap";
import { useMain } from "../context/main";

function GMap() {
  const { home } = useMain();

  useEffect(() => {
    if (home === "map") {
      initMap();
    }
  }, [home]);

  return (
    <div id="mapContainer" className="h-full">
      <div id="map" className="h-full"></div>
    </div>
  );
}

export default GMap;
