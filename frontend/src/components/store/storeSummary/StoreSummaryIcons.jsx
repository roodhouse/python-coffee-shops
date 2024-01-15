import React from 'react'
import { FaHeartCrack, FaHeart } from "react-icons/fa6";


// add handleclick for other 2 icons, adjust the function to look for all each time a click on any of them is made

function StoreSummaryIcons() {

    const handleClick = (e) => {
        const iconParent = e.currentTarget

        if ( iconParent.classList.contains('text-[#ddd]')) {
            iconParent.classList.remove('text-[#ddd]')
            iconParent.classList.add('text-red')
        } else {
            iconParent.classList.remove('text-red')
            iconParent.classList.add('text-[#ddd]')
        }

    }

  return (
    <>
        <div id="storeSummaryIconsContainer" className='flex justify-evenly text-5xl'>
            <div id="noIconContainer" className='text-[#ddd]' onClick={handleClick}>
                <FaHeartCrack />
            </div>
            <div id="sometimesIconContainer" className='text-[#ddd]'>
                <FaHeart />
            </div>
            <div id="yesIconContainer" className='text-[#ddd]'>
                <FaHeart />
            </div>
        </div>
    </>
  )
}

export default StoreSummaryIcons