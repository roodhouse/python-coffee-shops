import React from 'react'

function City(city) {

  return (
    <>
      <div id={city.city + 'Container'} className='uppercase tracking-wider px-4 py-6 bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] rounded-md'>
        <p>{city.city}</p>
      </div>
    </>
  )
}

export default City