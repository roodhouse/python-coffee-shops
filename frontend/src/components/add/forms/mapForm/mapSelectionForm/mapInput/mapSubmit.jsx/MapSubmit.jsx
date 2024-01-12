import React from 'react'

function MapSubmit() {
  return (
    <>
        <div id="mapSubmitContainer" className='bg-blue rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-blue hover:bg-white hover:text-black'>
            <button
                type='submit'
                id='mapSubmitButton'
                name='mapSubmitButton'
            >
                Next
            </button>
        </div>
    </>
  )
}

export default MapSubmit