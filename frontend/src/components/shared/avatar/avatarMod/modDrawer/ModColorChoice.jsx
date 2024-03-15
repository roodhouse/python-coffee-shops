import React, { useState, useEffect } from 'react'
import { ChromePicker } from 'react-color'
import { userPatch } from '../../../../../utils/sendToDatabase/userAPI/userPatch'
import { useMain } from '../../../../../context/main'

function ModColorChoice({currentColor, onColorChange, user}) {

    const [ color, setColor ] = useState(currentColor)
    const { aggDataUpdated } = useMain()

    const handleColorChange = (newColor) => {
        setColor(newColor.hex)
        onColorChange(newColor.hex)
        let updateUser = userPatch(user, newColor.hex)
        if (updateUser) {
            try {
                aggDataUpdated(true)
            } catch (error) {
                console.error('unable to update aggData: ', error)
            }
        }
    }

    useEffect(() => {
        setColor(currentColor)
    },[currentColor])

    useEffect(() => {
        let modAvatar = document.getElementById('avatarModColorContainer')    
        if (modAvatar) {
            modAvatar.style.backgroundColor = color
        }    
    },[color])

  return (
    <>
        <div id="modColorChoiceContainer">
            <ChromePicker color={color} onChange={handleColorChange} width={'100%'} disableAlpha={true} />
        </div>
    </>
  )
}

export default ModColorChoice