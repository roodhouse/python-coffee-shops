import React from 'react'
import Avatar from './Avatar'
import AvatarHeadCopy from './avatarMod/AvatarHeadCopy'
import AvatarChoice from './avatarMod/AvatarChoice'

// create mod here

function AvatarMod({user}) {
  return (
    <>
        <div id="avatarModContainer" className='w-full h-52 bg-white rounded-lg'>
            <div id="avatarModHeaderContainer" className='flex items-center p-3'>
                <div id="modAvatarWrapper">
                { user && user.avatar ? (
                    user.avatar.includes('http') ? (
                        <div
                        id='avatarModImageContainer'
                        className='w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat'
                        style={{ backgroundImage: `url(${user.avatar})`}}
                    />
                    ) : (
                        <div
                        id='avatarModImageContainer'
                        className={`w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat bg-${user.avatar}`}
                    >
                        {user.email.split("")[0]}
                    </div>
                    )
                ) : '' }
                </div>
                <div id="avatarModHeaderCopyWrapper" className='pl-7'>
                    <AvatarHeadCopy />
                </div>
            </div>
            <div id="avatarChoiceWrapper">
                <AvatarChoice user={user} />
            </div>
        </div>
    </>
  )
}

export default AvatarMod