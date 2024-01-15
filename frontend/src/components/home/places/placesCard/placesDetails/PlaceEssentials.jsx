import React from 'react'
import PlaceName from './placeEssentials/PlaceName'
import PlaceLocation from './placeEssentials/PlaceLocation'
import PlaceHours from './placeEssentials/PlaceHours'

function PlaceEssentials() {
  return (
    <>
        <div id="placeEssentialsContainer">
            <div id="placeNameWrapper" className='mb-2'>
                <PlaceName />
            </div>
            <div id="placeHoursWrapper" className='mb-2'>
                <PlaceHours />
            </div>
            <div id="placeLocationWrapper">
                <PlaceLocation margin={'mr-2'} />
            </div>
        </div>
    </>
  )
}

export default PlaceEssentials