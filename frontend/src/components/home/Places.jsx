import React from 'react'
import { useMain } from '../../context/main'
import PlacesTitle from './places/PlacesTitle'
import PlacesCard from './places/PlacesCard'
import PlacesNew from './places/PlacesNew'

function Places() {

    const { setVenue, venues, review } = useMain()

    const handleClick = (e) => { 
        let placeCard = e.currentTarget
        let placeId = placeCard.getAttribute('data-uniqueplaceid')
        let placeName = placeCard.getAttribute('data-placename')
        setVenue(placeId, placeName)
    }

  return (
    <>
        <div id="placesContainer">
            <div id="placesTitleWrapper" className='pb-4'>
                <PlacesTitle />
            </div>
            {venues !== null ? (
                venues.venues.map((venue) => (
                    <div key={venue.id} id="placesCardWrapper-perkyBeans" className='pb-4' data-uniqueplaceid={venue.place_id} data-placename={venue.name} onClick={handleClick}>
                        <PlacesCard image={venue.image} rating={(venue.rating/2) * 100} name={venue.name} hours={venue.hours} address={venue.address} />
                    </div>    
                ))
            ) : ''}
            <div id="placesNewWrapper" className='my-8'>
                <PlacesNew />
            </div>
        </div>
    </>
  )
}

export default Places