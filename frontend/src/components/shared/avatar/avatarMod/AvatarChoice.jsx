import React from 'react'

function AvatarChoice({ user, currentColor, toggleDrawer }) {

    

    const handleClick = (type) => {
        toggleDrawer(type)
    }

  return (
    <>
        <div id='avatarChoiceContainer' className='flex justify-evenly px-3'>
            { user && user.avatar ? (
                user.avatar.includes('http') ? (
                    <>
                        <div
                            id='avatarModImageContainer'
                            className='w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat'
                            style={{ backgroundImage: `url(${user.avatar})`}}
                            onClick={() => handleClick('image')}
                        />
                        <div
                            id='avatarModColorContainer'
                            className={`w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat bg-black`}
                            onClick={() => handleClick('color')}
                        >
                            {user.email.split("")[0]}
                        </div>
                    </>

                ) : (
                    <>
                        <div
                            id='avatarModColorContainer'
                            className={`w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat`}
                            onClick={() => handleClick('color')}
                            style={{backgroundColor: currentColor}}
                        >
                            {user.email.split("")[0]}
                        </div>
                        <div
                            id='avatarModImageContainer'
                            className='w-12 h-12 text-center capitalize rounded-[50%] text-black text-2xl flex justify-center items-center bg-cover bg-no-repeat bg-white border border-dotted border-black'
                            onClick={() => handleClick('image')}
                        >
                            U
                        </div>
                    </>
                )
                
            ) : '' }
        </div>
    </>
  )
}

export default AvatarChoice