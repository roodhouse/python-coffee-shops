import React from 'react'
import { useMain } from '../../../../context/main';

function HeroTitle() {

  const { currentCity } = useMain()
  return (
    <>
      <div id="heroTitleContainer" className='text-4xl uppercase font-bold tracking-wider'>
        <h2>{currentCity}</h2>
      </div>
    </>
  )
}

export default HeroTitle