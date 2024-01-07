import React from 'react'
import { HiPlusCircle } from "react-icons/hi";

function Suggest() {
  return (
    <>
        <div id="suggestContainer">
            <div id="suggestIcon" className='text-[1.4em] text-white'>
                <HiPlusCircle />
            </div>
            <div id="suggestName" className='hidden'>
                <p>Suggest Places</p>
            </div>
        </div>
    </>
  )
}

export default Suggest