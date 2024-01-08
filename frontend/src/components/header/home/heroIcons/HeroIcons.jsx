import React from 'react'
import FilterIcon from './filterIcon/FilterIcon'
import MapIcon from './mapIcon/MapIcon'

function HeroIcons() {
  return (
    <>
      <div id="heroIconsContainer" className='flex flex-nowrap '>
        <div id="filterIconWrapper" className='px-2 py-3 w-11 flex justify-center shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] rounded-md'>
          <FilterIcon />
        </div>
        <div id="mapIconWrapper" className='px-2 py-3 w-11 flex justify-center shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] rounded-md'>
          <MapIcon />
        </div>
      </div>
    </>
  )
}

export default HeroIcons