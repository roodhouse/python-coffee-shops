import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import avatarGenerateStyle from '../../../utils/miscFunctions/avatarGenerateStyle';

// review count should come from the database
// on click of arrow then show more comments or hide additional comments

let reviewCount = 2

function Avatar({ align, display, name, pic, user, userId, index, comment }) {

  const [ arrow, setArrow ] = useState('down')

  const handleClick = () => {
     arrow === 'down' ? (
      setArrow('up')
    ) : (
      setArrow('down')
    )
  }
  
  let avatarStyle;
  // if (comment) {
  //   // need to change this to url... not working because it is not always a url
  //   avatarStyle = pic
  //   console.log(avatarStyle)
  // } else {
  //   avatarStyle = avatarGenerateStyle(user, userId, pic, index)
  // }
  avatarStyle = avatarGenerateStyle(user, userId, pic, index, comment, name)

  return (
    <>
        <div id="avatarContainer" className={`${display} ${align}`}>
            <div id={`${index}-${name}-Avatar`} className={`w-12 h-12 bg-cover bg-no-repeat rounded-[50%]`} style={{backgroundImage: avatarStyle}}/>
            {/* <div id={`${index}Avatar`} className={`w-12 h-12 bg-cover bg-no-repeat rounded-[50%]`} style={comment ? { backgroundImage: `url(${avatarStyle})` } : { backgroundImage: avatarStyle} }/> */}
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
    </>
  )
}

export default Avatar