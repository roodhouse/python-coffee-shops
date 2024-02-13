import React from 'react'
import { FaHeartCrack, FaHeart } from "react-icons/fa6";
import { useMain } from '../../../context/main';

// change default heart color to the result of the sum field if the user has a review for this venue

function StoreSummaryIcons() {

    const { userAuthenticated, setPage, review } = useMain()

    let usersOverallRating;
    if (review) {
        console.log(review.answers[0])
        usersOverallRating = review.answers[0].sum
    }

    const handleClick = (e) => {

        if (userAuthenticated) {

            const iconParent = e.currentTarget
    
            function getSiblings(element) {
                const parent = element.parentNode;
    
                const children = Array.from(parent.children)
    
                const siblings = children.filter(child => child !== element)
    
                return siblings
            }
    
            const siblings = getSiblings(iconParent)
    
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

            // conditional for what to send to the fetch request
            // going to need new rating, user data...
        } else {
            setPage('join')
        }

    }

  return (
    <>
        <div id="storeSummaryIconsContainer" className='flex justify-evenly text-5xl'>
            <div id="noIconContainer" className={usersOverallRating === 0 ? 'text-red' : 'text-[#ddd]'} onClick={handleClick}>
                <FaHeartCrack />
            </div>
            <div id="sometimesIconContainer" className={usersOverallRating === 1 ? 'text-[#f6D95E]' : 'text-[#ddd]'} onClick={handleClick}>
                <FaHeart />
            </div>
            <div id="yesIconContainer" className={usersOverallRating === 2 ? 'text-green' : 'text-[#ddd]'} onClick={handleClick}>
                <FaHeart />
            </div>
        </div>
    </>
  )
}

export default StoreSummaryIcons