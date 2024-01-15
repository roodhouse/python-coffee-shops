import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

// review count should come from the database
// on click of arrow then show more comments or hide additional comments

let reviewCount = 2

function Avatar({ align, display, name }) {

  const [ arrow, setArrow ] = useState('down')

  const handleClick = () => {
     arrow === 'down' ? (
      setArrow('up')
    ) : (
      setArrow('down')
    )
  }

  return (
    <>
        <div id="avatarContainer" className={`${display} ${align}`}>
            <div id="avatar" className='bg-[url("assets/meAgain.jpeg")] w-12 h-12 bg-cover bg-no-repeat rounded-[50%]'/>
        </div>
        {name === 'comment' ? (
            reviewCount > 1 ? (
              <div id="moreReviewsContainer">
                <p className='flex items-center'>
                  <span className='mr-2'>{
                    arrow === 'down' ? (
                      <FaCaretDown />
                    )
                   : (
                      <FaCaretUp />
                  )}</span>
                  <span className='underline' onClick={handleClick}>See all reviews</span>
                </p>
              </div>
            ) : (
              null
            )
        ) : null}
        {/* {reviewCount > 1 ? (
          <div id="moreReviewsContainer">
            <p className='flex items-center'>
              <span className='mr-2'>{
                arrow === 'down' ? (
                  <FaCaretDown />
                )
               : (
                  <FaCaretUp />
              )}</span>
              <span className='underline' onClick={handleClick}>See all reviews</span>
            </p>
          </div>
        ) : (
          null
        )} */}
    </>
  )
}

export default Avatar