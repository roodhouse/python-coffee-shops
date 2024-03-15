import React from 'react'
import ModColorChoice from './modDrawer/ModColorChoice'
import ModCustomImage from './modDrawer/ModCustomImage'

function ModDrawer({ type, currentColor, onColorChange, user, toggleDrawer }) {
  return (
    <>
        <div id="modDrawerContainer" className='w-full h-[21rem] bg-white rounded-lg p-3'>
            { type === 'color' ? (
                <div id="modColorChoiceWrapper">
                    <ModColorChoice currentColor={currentColor} onColorChange={onColorChange} user={user} />
                </div>

            ) : (
                <div id="modCustomImageWrapper">
                    <ModCustomImage user={user} toggleDrawer={toggleDrawer} />
                </div>
                
            )} 
        </div>
    </>
  )
}

export default ModDrawer