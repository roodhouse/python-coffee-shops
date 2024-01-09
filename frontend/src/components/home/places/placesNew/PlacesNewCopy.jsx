import React from 'react'
import PlacesNewCopyTitle from './copy/PlacesNewCopyTitle'
import PlacesNewCopyBody from './copy/PlacesNewCopyBody'

function PlacesNewCopy() {
  return (
    <>
      <div id="placesNewCopyContainer">
        <div id="placesNewCopyTitleWrapper">
          <PlacesNewCopyTitle />
        </div>
        <div id="placesNewCopyBodyWrapper">
          <PlacesNewCopyBody />
        </div>
      </div>
    </>
  )
}

export default PlacesNewCopy