import React from 'react'

function StoreHeading({ heading }) {
  return (
    <>
        <div id="storeHeadingContainer" className='text-2xl mb-5'>
            <h2>{heading}</h2>
        </div>
    </>
  )
}

export default StoreHeading