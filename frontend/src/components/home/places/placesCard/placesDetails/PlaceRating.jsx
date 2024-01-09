import React from 'react'
import HeartIcon from './placeRating/HeartIcon'
import Rating from './placeRating/Rating'

function PlaceRating() {
  return (
    <>
      <div id="placeRatingContainer" className='flex items-center justify-evenly w-full'>
        <div id="heartIconWrapper">
          <HeartIcon />
        </div>
        <div className='text-xs text-green font-bold'>|</div>
        <div id="ratingWrapper" className='cursor-pointer'>
          <Rating />
        </div>
      </div>
    </>
  )
}

export default PlaceRating