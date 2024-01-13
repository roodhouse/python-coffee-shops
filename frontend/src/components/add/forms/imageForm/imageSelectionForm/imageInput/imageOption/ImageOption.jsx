import React from 'react'

function ImageOption({ photo, onClick, isSelected }) {
  
  return (
    <>
        <div id={photo+'image'} className={`image-option ${isSelected ? 'selected border border-blue' : ''}`} onClick={onClick}>
          {/* replace this with image */}
          <p>{photo}</p>
        </div>
    </>
  )
}

export default ImageOption