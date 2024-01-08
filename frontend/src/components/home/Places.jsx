import React from 'react'
import PlacesTitle from './places/PlacesTitle'
import PlacesCard from './places/PlacesCard'
import PlacesNew from './places/PlacesNew'

// header
// card
// add new

function Places() {
  return (
    <>
        <div id="placesContainer">
            <div id="placesTitleWrapper">
                <PlacesTitle />
            </div>
            <div id="placesCardWrapper">
                <PlacesCard />
            </div>
            <div id="placesNewWrapper">
                <PlacesNew />
            </div>
        </div>
    </>
  )
}

export default Places