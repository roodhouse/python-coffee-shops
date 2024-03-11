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
                { user ? (
                    <Avatar
                    align={'center'}
                    display={'flex'}
                    name={'mod'}
                    pic={user.avatar}
                    user={user.email}
                    userId={user.user_id}
                    index={user.user_id}
                    comment={false}
                    />
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