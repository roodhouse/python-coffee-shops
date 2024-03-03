import React from 'react'
import { useMain } from '../../../../context/main'

function StoreTitle() {

  const { currentVenue, currentVenueData } = useMain()
  
  return (
    <>
      <div id="storeTitleContainer" className='text-4xl uppercase font-bold tracking-wider text-white'>
        <a href={ currentVenueData && currentVenueData.website ? currentVenueData.website : ''} target="_blank" rel="noreferrer">
          <h2>{currentVenue}</h2>
        </a>
      </div>
    </>
  )
}

export default StoreTitle