import React, { useEffect } from 'react'
import avatarGenerateStyle from '../../../utils/miscFunctions/avatarGenerateStyle';

function Avatar({ align, display, name, pic, user, userId, index, comment, amount, seeAllReviews }) {

  useEffect(() => {
    avatarGenerateStyle(user, userId, pic, index, comment, name)
  },[seeAllReviews, user, userId, pic, index, comment, name])
  
  let avatarStyle;
  avatarStyle = avatarGenerateStyle(user, userId, pic, index, comment, name)

  return (
    <>
        <div id={`${name}-${index}-avatarContainer`} className={`${display} ${align}`}>
            <div id={`${index}-${name}-Avatar`} className={`w-12 h-12 bg-cover bg-no-repeat rounded-[50%]`} style={{backgroundImage: avatarStyle}}/>
        </div>
    </>
  )
}

export default Avatar