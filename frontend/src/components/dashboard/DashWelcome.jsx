import React from 'react'
import Avatar from '../shared/avatar/Avatar'

// bring in username and avatar image from db

function DashWelcome() {
  return (
    <>
        <div id="dashWelcomeContainer" className='flex items-center justify-between'>
            <div id="dashUserNameContainer">
                <p>Welcome username!</p>
            </div>
            <div id="dashAvatarWrapper">
                <Avatar />
            </div>
        </div>
    </>
  )
}

export default DashWelcome