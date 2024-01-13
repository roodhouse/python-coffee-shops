import React from 'react'
import AddTitle from './addCopy/AddTitle'
import AddText from './addCopy/AddText'

function AddCopy() {
  return (
    <>
        <div id="addCopyContainer">
            <div id="addTitleWrapper" className='mb-8'>
                <AddTitle />
            </div>
            <div id="addTextWrapper">
                <AddText />
            </div>
        </div>
    </>
  )
}

export default AddCopy