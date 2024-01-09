import React from 'react'
import { useMain } from '../../../context/main'

function PlacesTitle() {

  const { venueCount, currentCity } = useMain()
  return (
    <>
      <div id="placesTitleContainer" className='text-2xl uppercase font-bold tracking-wider'>
        <p>{venueCount} {currentCity} area venues</p>
      </div>
    </>
  )
}

export default PlacesTitle