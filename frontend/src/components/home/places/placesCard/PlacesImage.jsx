import React from 'react'

function PlacesImage({ image, name }) {
  console.log(image)
  return (
    <>
        <div id="placesImageContainer" className='max-w-[351px]'>
            <img className='w-full max-h-[265px]' src={image} alt={name} />
        </div>
    </>
  )
}

export default PlacesImage