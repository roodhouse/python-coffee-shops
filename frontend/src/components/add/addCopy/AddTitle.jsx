import React from 'react'

function AddTitle({copy}) {
  return (
    <>
        <div id="addTitleContainer" className='text-4xl uppercase font-bold tracking-wider text-center'>
            <h2>{copy}</h2>
        </div>
    </>
  )
}

export default AddTitle