import React from 'react'
import { IoMdGlobe } from "react-icons/io";

function AllCities() {
  return (
    <>
        <div id="allCitiesContainer">
            <div id="allCitiesIcon" className='text-[1.4em] text-white'>
                <IoMdGlobe />
            </div>
            <div id="allCitiesName" className='hidden'>
                <p>All Cities</p>
            </div>
        </div>
    </>
  )
}

export default AllCities