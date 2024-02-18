import React from 'react'
import Avatar from '../shared/avatar/Avatar'
import { useMain } from '../../context/main'

function DashWelcome() {
  const { userData } = useMain()
  
  return (
    <>
        <div id="dashWelcomeContainer" className='flex items-center justify-between'>
            <div id="dashUserNameContainer">
                <p>Welcome username!</p>
            </div>
            <div id="dashAvatarWrapper">
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
        </div>
    </>
  )
}

export default DashWelcome