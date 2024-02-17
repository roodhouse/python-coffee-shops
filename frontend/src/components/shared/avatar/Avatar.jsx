import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

// review count should come from the database
// on click of arrow then show more comments or hide additional comments

let reviewCount = 2

function Avatar({ align, display, name, pic, user, index }) {

  const [ arrow, setArrow ] = useState('down')

  const handleClick = () => {
     arrow === 'down' ? (
      setArrow('up')
    ) : (
      setArrow('down')
    )
  }

  let avatarStyle;
  if (user) {
    if (pic === null) {
      console.log(user.split("")[0])
      avatarStyle = user.split("")[0]
      let initial = document.getElementById(`${index}Avatar`)
      if (initial) {
        initial.innerHTML = avatarStyle
      } 
    } else {
      avatarStyle = `url("${pic}")`
    }
  }

  // give these classes to the initial avatar above:
  // text-align: center;
  //   text-transform: capitalize;
  //   font-size: 30px;
  //   background-color: red;
  //   border-radius: 50%;
  //   color: white;
  //   width: 48px
  //   height: 48px

  return (
    <>
        <div id="avatarContainer" className={`${display} ${align}`}>
            <div id={`${index}Avatar`} className={`w-12 h-12 bg-cover bg-no-repeat rounded-[50%]`} style={{backgroundImage: avatarStyle}}/>
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