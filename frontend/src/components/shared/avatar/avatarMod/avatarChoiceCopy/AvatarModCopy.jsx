import React from 'react'

function AvatarModCopy({open}) {
  return (
    <>
        <div id="avatarModCopyContainer">
            {
                open ? (
                        <p>Customize your avatar below</p>
                    ) : (
                        <p>Click above to customize your avatar</p>
                )
            }
            
        </div>
    </>
  )
}

export default AvatarModCopy