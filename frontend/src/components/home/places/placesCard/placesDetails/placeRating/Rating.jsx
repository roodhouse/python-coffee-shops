import React from 'react'

function Rating({ display, rating }) {
  return (
    <>
        <div id="ratingContainer" className={`${rating > 89 ? 'text-green' : rating <= 89 && rating >= 70 ? 'text-[#f6d95e]' : 'text-red'} font-bold text-base`}>
            <p>{rating}% <span style={{display: display}}>Remote Friendly</span></p>
        </div>
    </>
  )
}

export default Rating