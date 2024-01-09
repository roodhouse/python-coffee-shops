import React from 'react'
import PlacesImage from './placesCard/PlacesImage'
import PlacesDetails from './placesCard/PlacesDetails'

function PlacesCard() {
  return (
    <>
      <div id="placesImageWrapper" className='mb-3'>
        <PlacesImage />
      </div>
      <div id="placesDetailsWrapper">
        <PlacesDetails />
      </div>
    </>
  )
}

export default PlacesCard