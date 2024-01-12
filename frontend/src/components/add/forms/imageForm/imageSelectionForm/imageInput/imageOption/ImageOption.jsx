import React from 'react'

function ImageOption({ photo }) {
  return (
    <>
        <option value={photo}>{photo}</option>
    </>
  )
}

export default ImageOption