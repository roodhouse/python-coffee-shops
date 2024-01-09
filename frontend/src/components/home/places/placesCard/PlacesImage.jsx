import React from 'react'
import PerkyBeansImage from '../../../../assets/perkyBeans.jpeg'

function PlacesImage() {
  return (
    <>
        <div id="placesImageContainer" className='max-w-[351px]'>
            <img src={PerkyBeansImage} alt="Perky Beans" />
        </div>
    </>
  )
}

export default PlacesImage