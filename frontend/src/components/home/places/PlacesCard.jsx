import React from 'react'
import PlacesImage from './placesCard/PlacesImage'
import PlacesDetails from './placesCard/PlacesDetails'

function PlacesCard({ image, rating, name, hours, address }) {
  return (
    <>
      <div id="placesImageWrapper" className='mb-3'>
        <PlacesImage image={image} name={name} />
      </div>
      <div id="placesDetailsWrapper">
        <PlacesDetails name={name} rating={rating} hours={hours} address={address} />
      </div>
    </>
  )
}

export default PlacesCard