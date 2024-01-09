import React from 'react'
import PlaceEssentials from './placesDetails/PlaceEssentials'
import PlaceRating from './placesDetails/PlaceRating'

function PlacesDetails() {
  return (
    <>
        <div id="placesDetailsContainer" className='flex align-top justify-between'>
            <div id="placeEssentialsWrapper">
                <PlaceEssentials />
            </div>
            <div id="placeRatingWrapper" className='border-2 border-green rounded w-[80px] h-[23px] flex'>
                <PlaceRating />
            </div>
        </div>
    </>
  )
}

export default PlacesDetails