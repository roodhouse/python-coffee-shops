import React from 'react'
import PlaceLocation from '../../home/places/placesCard/placesDetails/placeEssentials/PlaceLocation'
import { useMain } from '../../../context/main'

function StoreLocation() {

  const { currentVenueData } = useMain()

  return (
    <>
        <div id="storeLocationContainer" className='underline'>
            <a href={ currentVenueData && currentVenueData.map ? currentVenueData.map : ''} target="_blank" rel="noreferrer">
                <PlaceLocation address={currentVenueData && currentVenueData.address ? currentVenueData.address : ''} margin={'mr-14'} />
            </a>
        </div>
    </>
  )
}

export default StoreLocation