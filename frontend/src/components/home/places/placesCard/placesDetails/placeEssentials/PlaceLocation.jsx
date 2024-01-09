import React from 'react'
import LocationIcon from './placeLocation/LocationIcon'
import Address from './placeLocation/Address'

function PlaceLocation() {
  return (
    <>
        <div id="placeLocationContainer" className='flex items-center'>
            <div id="locationIconWrapper" className='mr-2'>
                <LocationIcon />
            </div>
            <div id="addressWrapper">
                <Address />
            </div>
        </div>
    </>
  )
}

export default PlaceLocation