import React, { useState } from 'react'
import Avatar from '../shared/avatar/Avatar'
import { useMain } from '../../context/main'
import disableScroll from '../../utils/scroll/disableScroll'
import enableScroll from '../../utils/scroll/enableScroll'
import AvatarMod from '../shared/avatar/AvatarMod'

// need to enableScroll on confirm or cancel click

function DashWelcome() {
  const { userData } = useMain()
  const [ avatarMod, setAvatarMod ] = useState(false)

  const handleAvatarClick = () => {
    console.log('avatar click')
    disableScroll()
    let avatarMask = document.getElementById('avatarMask')
    avatarMask.classList.add('bg-gray', 'w-full', 'absolute', 'h-screen', 'opacity-25', 'z-40', 'pointer-events-none')
    setAvatarMod(true)
    console.log(avatarMask)
    
  }
  
  return (
    <>
        <div id="dashWelcomeContainer" className='flex items-center justify-between'>
            <div id="dashUserNameContainer">
                <p>Welcome @{userData && userData.email ? userData.email.split('@')[0] : ''}!</p>
            </div>
            <div onClick={handleAvatarClick} id="dashAvatarWrapper">
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
            <div id='avatarModWrapper' className={avatarMod ? 'absolute block z-60' : 'hidden'}>
              { avatarMod ? (
                <AvatarMod user={userData} />
              ) : ''}
            </div>
        </div>
    </>
  )
}

export default DashWelcome