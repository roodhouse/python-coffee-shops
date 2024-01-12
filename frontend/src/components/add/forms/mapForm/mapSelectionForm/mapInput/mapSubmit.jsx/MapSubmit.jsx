import React from 'react'
import NextButton from '../../../../next/NextButton'

function MapSubmit() {
  return (
    <>
        <div id="mapSubmitContainer" className='bg-blue rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-blue hover:bg-white hover:text-black'>
            {/* <button
                type='submit'
                id='mapSubmitButton'
                name='mapSubmitButton'
            >
                Next
            </button> */}

            <NextButton name={'mapSubmitButton'} id={'mapSubmitButton'} />
        </div>
    </>
  )
}

export default MapSubmit