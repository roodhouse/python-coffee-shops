import React from 'react'
import HeartIcon from './placeRating/HeartIcon'
import Rating from './placeRating/Rating'

function PlaceRating({ width, height, background, display, border, heart, rating }) {
  return (
    <>
      <div id="placeRatingContainer" className={`flex ${width} ${height} ${background} ${border} items-center justify-evenly ${rating > 89 ? 'border-green' : rating <= 89 && rating >= 70 ? 'border-[#f6d95e]' : 'border-red'} rounded`}>
        <div id="heartIconWrapper">
          <HeartIcon heart={heart} rating={rating} />
        </div>
        <div className={`text-xs ${rating > 89 ? 'text-green' : rating <= 89 && rating >= 70 ? 'text-[#f6d95e]' : 'text-red'} font-bold`}>|</div>
        <div id="ratingWrapper" className='cursor-pointer'>
          <Rating display={display} rating={rating} />
        </div>
      </div>
    </>
  )
}

export default PlaceRating