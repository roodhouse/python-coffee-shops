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
            <div id="placeRatingWrapper">
                <PlaceRating width={'w-[100px]'} height={'h-[23px]'} display={'none'} border={'border-2'} heart={'text-green'} />
            </div>
        </div>
    </>
  )
}

export default PlacesDetails