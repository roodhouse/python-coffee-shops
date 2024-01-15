import React from 'react'
import PlaceRating from '../home/places/placesCard/placesDetails/PlaceRating'
import TitleMap from './storeHero/TitleMap'

// turn the rating widget into a shared component then refactor home page and this page

function StoreHero() {
  return (
    <>
      <div id="storeHeroContainer" className='px-3 pb-5 w-full'>
        <div id="storeHeroPlaceRatingWrapper" className='mb-2'>
          <PlaceRating width={'w-[250px]'} height={'h-23px'} background={'bg-[rgba(0,0,0,0.5)]'} border={'border-4'} heart={'text-white'} />
        </div>
        <div id="storeTitleMapWrapper">
          <TitleMap />
        </div>
      </div>
    </>
  )
}

export default StoreHero