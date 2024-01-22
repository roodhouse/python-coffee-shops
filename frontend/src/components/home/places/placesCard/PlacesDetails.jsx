import React from 'react'
import PlaceEssentials from './placesDetails/PlaceEssentials'
import PlaceRating from './placesDetails/PlaceRating'

function PlacesDetails({ name, rating, hours, address }) {
  return (
    <>
        <div id="placesDetailsContainer" className='flex align-top justify-between'>
            <div id="placeEssentialsWrapper">
                <PlaceEssentials name={name} hours={hours} address={address} />
            </div>
            <div id="placeRatingWrapper">
                <PlaceRating rating={rating} width={'w-[100px]'} height={'h-[23px]'} display={'none'} border={'border-2'} heart={rating > 89 ? 'text-green' : rating <= 89 && rating >= 70 ? 'text-[#f6d95e]' : 'text-red'} />
            </div>
        </div>
    </>
  )
}

export default PlacesDetails