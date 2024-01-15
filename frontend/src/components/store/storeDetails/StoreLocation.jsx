import React from 'react'
import PlaceLocation from '../../home/places/placesCard/placesDetails/placeEssentials/PlaceLocation'

function StoreLocation() {
  return (
    <>
        <div id="storeLocationContainer" className='underline'>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <PlaceLocation margin={'mr-14'} />
            </a>
        </div>
    </>
  )
}

export default StoreLocation