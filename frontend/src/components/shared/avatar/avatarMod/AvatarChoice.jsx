import React, {useState} from 'react'
import { SketchPicker, ChromePicker } from 'react-color'

function AvatarChoice({user}) {

    console.log(SketchPicker)

    const [ selectedColor, setSelectedColor ] = useState(null)
    const [ color, setColor ] = useState('#ff0000')

    const handleColorChange = (newColor) => {
        console.log(newColor)
        setColor(newColor.hex)
    }

    console.log(user)

    const handleClick = (color, index) => {
        console.log( color, index)
        setSelectedColor(color)
    }

    // let change = ['red', '#f6da5e', 'blue', 'green', 'purple']
    let change = ['green']
  return (
    <>
        <div id='avatarChoiceContainer' className='flex justify-between px-3'>
            { change ? (
                change.map((color, index) => (
                    <div 
                        key={index}
                        onClick={() => handleClick( color, index )}
                        className={`${color === selectedColor ? 'border-4 border-[#0088cc]' : ''} text-center capitalize w-12 h-12 rounded-[50%] text-white text-2xl flex justify-center items-center bg-[${color}]`}>
                            {user.email.split("")[0]}
                    </div>
                )
               )
            ) : 'hi'
        }
        {/* <SketchPicker color={color} onChange={handleColorChange} /> */}
        <ChromePicker color={color} onChange={handleColorChange} />
        </div>
    </>
  )
}

// r: '241',
//       g: '112',
//       b: '19',
//       a: '1',

export default AvatarChoice