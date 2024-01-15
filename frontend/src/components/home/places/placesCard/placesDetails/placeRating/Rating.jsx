import React from 'react'

function Rating({ display }) {
  return (
    <>
        <div id="ratingContainer" className='font-bold text-green text-base'>
            <p>98% <span style={{display: display}}>Remote Friendly</span></p>
        </div>
    </>
  )
}

export default Rating