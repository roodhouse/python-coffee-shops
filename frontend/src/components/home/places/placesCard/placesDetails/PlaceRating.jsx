import React from 'react'
import HeartIcon from './placeRating/HeartIcon'
import Rating from './placeRating/Rating'

function PlaceRating({ width, height, background, display, border, heart }) {
  return (
    <>
      <div id="placeRatingContainer" className={`flex ${width} ${height} ${background} ${border} items-center justify-evenly border-green rounded`}>
        <div id="heartIconWrapper">
          <HeartIcon heart={heart} />
        </div>
        <div className='text-xs text-green font-bold'>|</div>
        <div id="ratingWrapper" className='cursor-pointer'>
          <Rating display={display} />
        </div>
      </div>
    </>
  )
}

export default PlaceRating