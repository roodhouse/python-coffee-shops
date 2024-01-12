import React from 'react'
import BackButton from '../../../back/BackButton'
import MapSubmit from './mapSubmit.jsx/MapSubmit'

function MapInput() {
  return (
    <>
        <div id="mapInputContainer" className='flex justify-between'>
            <div id="mapInputBackButtonWrapper">
                <BackButton back={'venue'} />
            </div>
            <div id="mapInputSubmitButtonWrapper">
                <MapSubmit />
            </div>
        </div>
    </>
  )
}

export default MapInput