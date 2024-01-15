import React from 'react'
import { FaHeartCrack, FaHeart } from "react-icons/fa6";


// add handleclick for other 2 icons, adjust the function to look for all each time a click on any of them is made

function StoreSummaryIcons() {

    const handleClick = (e) => {
        const iconParent = e.currentTarget

        function getSiblings(element) {
            const parent = element.parentNode;

            const children = Array.from(parent.children)

            const siblings = children.filter(child => child !== element)

            return siblings
        }

        const siblings = getSiblings(iconParent)

        console.log(siblings)
        console.log(iconParent.id)

        for (let i = 0; i < siblings.length; i++ ) {
            if (siblings[i].classList.contains('text-red') || siblings[i].classList.contains('text-green') || siblings[i].classList.contains('text-[#F6D95E]')) {
                siblings[i].classList.replace('text-red', 'text-[#ddd]')
                siblings[i].classList.replace('text-green', 'text-[#ddd]')
                siblings[i].classList.replace('text-[#F6D95E]', 'text-[#ddd]')
            }
        }

        if ( iconParent.classList.contains('text-[#ddd]') ) {
            if ( iconParent.id === 'noIconContainer' ) {
                iconParent.classList.remove('text-[#ddd]')
                iconParent.classList.add('text-red')
            } else if ( iconParent.id === 'yesIconContainer' ) {
                iconParent.classList.remove('text-[#ddd]')
                iconParent.classList.add('text-green')
            } else {
                iconParent.classList.remove('text-[#ddd]')
                iconParent.classList.add('text-[#F6D95E]')
            }
        } else {
            iconParent.classList.remove(['text-red'])
            iconParent.classList.remove(['text-green'])
            iconParent.classList.remove(['text-[#F6D95E]'])
            iconParent.classList.add('text-[#ddd]')
        }

    }

  return (
    <>
        <div id="storeSummaryIconsContainer" className='flex justify-evenly text-5xl'>
            <div id="noIconContainer" className='text-[#ddd]' onClick={handleClick}>
                <FaHeartCrack />
            </div>
            <div id="sometimesIconContainer" className='text-[#ddd]' onClick={handleClick}>
                <FaHeart />
            </div>
            <div id="yesIconContainer" className='text-[#ddd]' onClick={handleClick}>
                <FaHeart />
            </div>
        </div>
    </>
  )
}

export default StoreSummaryIcons