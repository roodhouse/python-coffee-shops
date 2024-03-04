import React from 'react'

function StoreHeading({ page, heading }) {
  return (
    <>
        <div id={`storeHeadingContainer-${page}`} className='text-2xl mb-5'>
            <h2>{heading}</h2>
        </div>
    </>
  )
}

export default StoreHeading