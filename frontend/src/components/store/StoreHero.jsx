import React from 'react'
import PlaceRating from '../home/places/placesCard/placesDetails/PlaceRating'
import TitleMap from './storeHero/TitleMap'
import { useMain } from '../../context/main'

function StoreHero() {

  const { currentVenueData } = useMain()

  let currentRating = 0
  if (currentVenueData) {
    currentRating = (currentVenueData.rating / 2)*100
  }



  return (
    <>
      <div id="storeHeroContainer" className='px-3 pb-5 w-full'>
        <div id="storeHeroPlaceRatingWrapper" className='mb-2'>
          <PlaceRating width={'w-[250px]'} height={'h-23px'} background={'bg-[rgba(0,0,0,0.5)]'} border={'border-4'} heart={currentRating > 89 ? 'text-green' : currentRating <= 89 && currentRating >= 70 ? 'text-[#f6d95e]' : 'text-red'} rating={currentVenueData ? currentRating : ''}  />
        </div>
        <div id="storeTitleMapWrapper">
          <TitleMap />
        </div>
      </div>
    </>
  )
}

export default StoreHero