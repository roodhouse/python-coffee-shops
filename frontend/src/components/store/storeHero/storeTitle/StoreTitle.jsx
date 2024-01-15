import React from 'react'
import { useMain } from '../../../../context/main'

function StoreTitle() {

  const { currentVenue } = useMain()
  return (
    <>
      <div id="storeTitleContainer" className='text-4xl uppercase font-bold tracking-wider text-white'>
        <h2>{currentVenue}</h2>
      </div>
    </>
  )
}

export default StoreTitle