import React from 'react'
import { useAddForm } from '../../../../context/addFormContext'

function BackButton({ back }) {

    const { currentStep } = useAddForm()

    const handleBack = (e) => {
        e.preventDefault()
        currentStep(back)
    }

  return (
    <>
        <div id="backButtonContainer" className='bg-red rounded py-4 px-16 flex justify-center cursor-pointer text-center text-white border border-red hover:bg-white hover:text-black'>
            <button type='button' onClick={handleBack}>Back</button>
        </div>
    </>
  )
}

export default BackButton