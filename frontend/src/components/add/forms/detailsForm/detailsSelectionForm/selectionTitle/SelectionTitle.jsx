import React from 'react'
import { useAddForm } from '../../../../../../context/addFormContext'

function SelectionTitle() {

    const { formData } = useAddForm()

  return (
    <>
        <div id="selectionTitleContainer" className='font-["PT_Serif"] leading-7'>
            <p>Select details for {formData.venue} in {formData.location} </p>
        </div>
    </>
  )
}

export default SelectionTitle