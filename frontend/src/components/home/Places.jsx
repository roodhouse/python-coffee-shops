import React from 'react'
import PlacesTitle from './places/PlacesTitle'
import PlacesCard from './places/PlacesCard'
import PlacesNew from './places/PlacesNew'

// add new

function Places() {
  return (
    <>
        <div id="placesContainer">
            <div id="placesTitleWrapper" className='pb-4'>
                <PlacesTitle />
            </div>
            <div id="placesCardWrapper" className='pb-4'>
                <PlacesCard />
            </div>
            <div id="placesNewWrapper" className='mt-8'>
                <PlacesNew />
            </div>
        </div>
    </>
  )
}

export default Places