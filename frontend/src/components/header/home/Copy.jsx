import React from 'react'
import { useMain } from '../../../context/main';

function Copy() {

    const { currentCity } = useMain()

  return (
    <>
        <div id="copyContainer" className='font-["PT_Serif"] leading-7 text-justify TextAlignLast'>
            <p>Find the best places to work or study in {currentCity}. Discover venues with free and reliable Wi-Fi, available power sockets and spacious seating.</p>
        </div>
    </>
  )
}

export default Copy