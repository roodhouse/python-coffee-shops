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

    const handleClick = () => {
        // setModOpen(true)
        setModOpen(!modOpen)
    }

    let change = ['green']
  return (
    <>
        <div id='avatarChoiceContainer' className='flex justify-between px-3'>
            { change ? (
                change.map((color, index) => (
                    <div 
                        key={index}
                        onClick={handleClick}
                        className={`text-center capitalize w-12 h-12 rounded-[50%] text-white text-2xl flex justify-center items-center bg-[${color}]`}>
                            {user.email.split("")[0]}
                    </div>
                )
               )
            ) : 'hi'
        }
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