import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

function MoreReviews({toSeeReviews}) {

    const [ arrow, setArrow ] = useState('down')

  const handleClick = () => {
    if (arrow === 'down') {
        setArrow('up')
        toSeeReviews(true)
    } else {
        setArrow('down')
        toSeeReviews(false)
    }
  }
  return (
    <>
        <div id="moreReviewsContainer">
                <p className='flex items-center'>
                  <span className='mr-2'>{
                    arrow === 'down' ? (
                      <FaCaretDown />
                    )
                   : (
                      <FaCaretUp />
                  )}</span>
                  <span className='underline' onClick={handleClick}>{arrow === 'up' ? 'See less reviews' : 'See all reviews'}</span>
                </p>
              </div>
    </>
  )
}

export default MoreReviews