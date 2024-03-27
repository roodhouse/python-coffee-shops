import React from 'react'
import { useMain } from '../../../context/main'

function City(city) {

  const { setPage, setCity } = useMain()

  const handleClick = (e) => {
    const cityName = e.target.innerText
    setCity(cityName)
    setPage('home')
  }

  return (
    <>
      <div id={city.city + 'Container'} className='uppercase max-h-[72px] flex flex-col justify-center tracking-wider px-4 py-6 bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] rounded-md' onClick={handleClick}>
        <p>{city.city}</p>
      </div>
    </>
  )
}

export default City