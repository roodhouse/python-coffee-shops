import React from 'react'

function ImageOption({ photo, onClick, isSelected, index }) {
  
  return (
    <>
        <div id={'image-'+index} className={`image-option ${isSelected ? 'bg-[#0088cc]' : ''} p-2 border border-[#ddd] w-full h-full`} onClick={onClick}>
          <img className='h-full object-cover' src={photo} alt={'photo-'+index} />
        </div>
    </>
  )
}

export default ImageOption