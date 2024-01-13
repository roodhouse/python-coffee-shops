import React from 'react'
import SelectionTitle from './selectionTitle/SelectionTitle'
import DetailsInput from './detailsInput/DetailsInput'

function DetailsSelectionForm() {
  return (
    <>
        <div id="detailsSelectionFormContainer">
            <div id="detailsSelectionFormTitleWrapper" className='mb-4'>
                <SelectionTitle />
            </div>
            <div id="detailsInputWrapper">
                <DetailsInput />
            </div>
        </div>
    </>
  )
}

export default DetailsSelectionForm