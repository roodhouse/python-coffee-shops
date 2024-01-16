import React from 'react'
import FilterIcon from './filterIcon/FilterIcon'
import MapIcon from './mapIcon/MapIcon'
import { useMain } from '../../../../context/main'

function HeroIcons() {

  const { toggleFilter } = useMain()

  const handleClick = () => {
    toggleFilter()
  }

  return (
    <>
      <div id="heroIconsContainer" className='flex flex-nowrap '>
        <div id="filterIconWrapper" className='cursor-pointer px-2 py-3 w-11 flex justify-center shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] rounded-md' onClick={handleClick}>
            <FilterIcon />
        </div>
        <div id="mapIconWrapper" className='cursor-pointer px-2 py-3 w-11 flex justify-center shadow-[0_2px_5px_0_rgba(0,0,0,0.16),0_2px_10px_0_rgba(0,0,0,0.12)] rounded-md'>
          <MapIcon />
        </div>
      </div>
    </>
  )
}

export default HeroIcons