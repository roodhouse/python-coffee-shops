import React from 'react'

function AddFormTitle({ section }) {
  return (
    <>
        <div id="addFormTitleContainer" className='text-2xl mb-2'>
            <p>{section}</p>
        </div>
    </>
  )
}

export default AddFormTitle