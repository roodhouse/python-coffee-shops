import React, { useState, useEffect } from 'react'
import Avatar from '../shared/avatar/Avatar'
import { useMain } from '../../context/main'
import disableScroll from '../../utils/scroll/disableScroll'
import enableScroll from '../../utils/scroll/enableScroll'
import AvatarMod from '../shared/avatar/AvatarMod'

// need to enableScroll on confirm or cancel click

function DashWelcome() {
  const { userData, showMod, avatarMod } = useMain()

  const handleAvatarClick = () => {
    showMod()
  }
  
  return (
    <>
        <div id="dashWelcomeContainer" className='flex items-center justify-between'>
            <div id="dashUserNameContainer" className='pl-3'>
                <p>Welcome @{userData && userData.email ? userData.email.split('@')[0] : ''}!</p>
            </div>
            <div onClick={handleAvatarClick} id="dashAvatarWrapper" className='pr-3'>
              { userData ? (
                <Avatar
                  align={'center'}
                  display={'flex'}
                  name={'dash'}
                  pic={userData.avatar}
                  user={userData.email}
                  userId={userData.user_id}
                  index={userData.user_id}
                  comment={false}
                />
              ) : '' }
            </div>
            <div id='avatarModWrapper' className={avatarMod ? 'absolute block z-60 top-56 w-full px-2' : 'hidden'}>
              { avatarMod ? (
                <AvatarMod user={userData} />
              ) : ''}
            </div>
        </div>
    </>
  )
}

export default DashWelcome