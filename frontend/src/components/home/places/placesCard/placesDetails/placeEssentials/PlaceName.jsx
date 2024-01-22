import React from 'react'

function PlaceName({ name }) {

  return (
    <>
        <div id="placeNameContainer" className='text-xl'>
            <p>{name}</p>
        </div>
    </>
  )
}

export default PlaceName