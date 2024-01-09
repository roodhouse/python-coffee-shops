import React from 'react'
import PlacesNewIcon from './placesNew/PlacesNewIcon'
import PlacesNewCopy from './placesNew/PlacesNewCopy'

function PlacesNew() {
  return (
    <>
      <div id="placesNewContainer" className='flex items-center'>
        <div id="placesNewIconWrapper">
          <PlacesNewIcon />
        </div>
        <div id="placesNewCopyWrapper">
          <PlacesNewCopy />
        </div>
      </div>
    </>
  )
}

export default PlacesNew