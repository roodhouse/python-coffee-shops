import React from 'react'
import AvatarChoice from '../AvatarChoice'
import AvatarModCopy from './AvatarModCopy'

function AvatarChoiceCopy({ open, user, currentColor, toggleDrawer }) {
  return (
    <>
        <div id="avatarChoiceCopyContainer" className='flex flex-col item-center'>
          <div id="choiceCopyWrapper" className='w-full pb-6'>
            <AvatarChoice user={user} currentColor={currentColor} toggleDrawer={toggleDrawer} />
          </div>
          <div id="avatarModCopyWrapper">
            <AvatarModCopy open={open} />
          </div>
        </div>
    </>
  )
}

export default AvatarChoiceCopy