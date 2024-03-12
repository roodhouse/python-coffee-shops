import React, {useState} from 'react'
import { ChromePicker } from 'react-color'

function AvatarChoice({user}) {

    const [ color, setColor ] = useState({ r: 255, g: 0, b: 0, a: 1})
    const [ modOpen, setModOpen ] = useState(false)

    const handleColorChange = (newColor) => {
        console.log(newColor)
        setColor(newColor.rgb)
    }

    console.log(user)

    const handleClick = (avatar, type) => {
        console.log(avatar)
        setModOpen(!modOpen)
        if ( type === 'image' ) {
            console.log('image')
        } else {
            console.log('color')
        }
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
                            onClick={() => handleClick(user.avatar, 'image')}
                        />
                        <div
                            id='avatarModColorContainer'
                            className={`w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat bg-black`}
                            onClick={() => handleClick(user.avatar, 'color')}
                        >
                            {user.email.split("")[0]}
                        </div>
                    </>

                ) : (
                    <>
                        <div
                            id='avatarModColorContainer'
                            className={`w-12 h-12 text-center capitalize rounded-[50%] text-white text-2xl flex justify-center items-center bg-cover bg-no-repeat bg-${user.avatar}`}
                            onClick={() => handleClick(user.avatar, 'color')}
                        >
                            {user.email.split("")[0]}
                        </div>
                        <div
                            id='avatarModImageContainer'
                            className='w-12 h-12 text-center capitalize rounded-[50%] text-black text-2xl flex justify-center items-center bg-cover bg-no-repeat bg-white border border-dotted border-black'
                            onClick={() => handleClick(user.avatar, 'image')}
                        >
                            U
                        </div>
                    </>
                )
                
            ) : '' }
            {

                modOpen ? (
                    <ChromePicker color={color} onChange={handleColorChange} />
                ) : ''

            }
        </div>
    </>
  )
}

export default AvatarChoice