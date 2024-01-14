import React from 'react'
import { useMain } from '../../context/main'
import PlacesTitle from './places/PlacesTitle'
import PlacesCard from './places/PlacesCard'
import PlacesNew from './places/PlacesNew'

// need to replace "perkyBeans" below with info from database when setup

function Places() {

    const { setVenue } = useMain()

    const handleClick = (e) => {
        console.log(e.currentTarget)
        let placeCard = e.currentTarget
        placeCard = placeCard.getAttribute('data-uniquePlaceID')
        console.log(placeCard)
        setVenue(placeCard)
    }

  return (
    <>
        <div id="placesContainer">
            <div id="placesTitleWrapper" className='pb-4'>
                <PlacesTitle />
            </div>
            <div id="placesCardWrapper-perkyBeans" className='pb-4' data-uniquePlaceID={'perkyBeans'} onClick={handleClick}>
                <PlacesCard />
            </div>
            <div id="placesNewWrapper" className='my-8'>
                <PlacesNew />
            </div>
        </div>
    </>
  )
}

export default Places